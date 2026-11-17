begin;

create type public.chatbot_area as enum
  ('imobiliario', 'civil', 'familia', 'consumidor', 'trabalhista', 'previdenciario');
create type public.chatbot_status as enum
  ('novo', 'em_analise', 'aguardando_retorno', 'concluido', 'arquivado', 'cancelado');
create type public.chatbot_staff_role as enum ('atendente', 'advogado', 'administrador');

create table public.chatbot_admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 2 and 80),
  role public.chatbot_staff_role not null,
  active boolean not null default true
);

create table public.chatbot_leads (
  id uuid primary key default gen_random_uuid(),
  first_name text not null check (char_length(first_name) between 2 and 50),
  contact text not null check (char_length(contact) between 5 and 150),
  created_at timestamptz not null default now()
);

create table public.chatbot_intakes (
  id uuid primary key,
  lead_id uuid not null unique references public.chatbot_leads(id) on delete cascade,
  area public.chatbot_area not null,
  summary text not null check (char_length(summary) between 12 and 700),
  channel text not null check (channel in ('whatsapp', 'email')),
  priority text not null check (priority in ('regular', 'elevada', 'critica')),
  status public.chatbot_status not null default 'novo',
  assigned_to uuid references public.chatbot_admin_profiles(user_id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index chatbot_intakes_status_date on public.chatbot_intakes(status, created_at desc);
create index chatbot_intakes_assigned_date on public.chatbot_intakes(assigned_to, created_at desc);
create index chatbot_intakes_area_date on public.chatbot_intakes(area, created_at desc);
create index chatbot_intakes_priority_date on public.chatbot_intakes(priority, created_at desc);

create table public.chatbot_consent_events (
  intake_id uuid primary key references public.chatbot_intakes(id) on delete cascade,
  purpose text not null check (purpose = 'solicitar_atendimento'),
  notice_version text not null check (char_length(notice_version) between 1 and 80),
  draft_digest text not null check (char_length(draft_digest) = 43),
  confirmed_at timestamptz not null default now()
);

create table public.chatbot_audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor uuid references public.chatbot_admin_profiles(user_id) on delete set null,
  intake_id uuid references public.chatbot_intakes(id) on delete set null,
  action text not null,
  changes jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index chatbot_audit_logs_actor on public.chatbot_audit_logs(actor);
create index chatbot_audit_logs_intake on public.chatbot_audit_logs(intake_id, created_at desc);

create table public.chatbot_knowledge_sources (
  id uuid primary key default gen_random_uuid(),
  institution text not null,
  title text not null check (char_length(title) between 2 and 250),
  url text not null check (url ~ '^https://'),
  kind text not null check (kind in ('institucional', 'legislacao', 'jurisprudencia', 'orientacao')),
  published_on date,
  checked_on date,
  review_until date,
  version text not null,
  status text not null default 'draft' check (status in ('draft', 'approved', 'withdrawn')),
  check (status <> 'approved' or (checked_on is not null and review_until is not null and review_until >= checked_on)),
  unique (url, version)
);

create table public.chatbot_knowledge_documents (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references public.chatbot_knowledge_sources(id) on delete cascade,
  area public.chatbot_area not null,
  excerpt text not null check (char_length(excerpt) between 20 and 1400),
  keywords text not null default '',
  search tsvector generated always as (
    to_tsvector('portuguese'::regconfig, keywords || ' ' || excerpt)
  ) stored
);
create index chatbot_documents_source on public.chatbot_knowledge_documents(source_id);
create index chatbot_documents_search on public.chatbot_knowledge_documents using gin(search);

create table public.chatbot_delivery_attempts (
  intake_id uuid not null references public.chatbot_intakes(id) on delete cascade,
  channel text not null check (channel in ('email', 'whatsapp')),
  status text not null check (status in
    ('pendente', 'processando', 'aceito', 'entregue', 'falhou', 'incerto', 'link_gerado')),
  provider_id text unique,
  updated_at timestamptz not null default now(),
  primary key (intake_id, channel)
);
create index chatbot_delivery_pending on public.chatbot_delivery_attempts(updated_at)
  where channel = 'email' and status = 'pendente';

create table public.chatbot_rate_limits (
  bucket text primary key,
  consumed integer not null check (consumed > 0),
  expires_at timestamptz not null
);
create index chatbot_rate_limits_expiration on public.chatbot_rate_limits(expires_at);

-- Only backend credentials can access these tables or the internal RPCs.
do $$
declare
  relation text;
begin
  foreach relation in array array[
    'chatbot_admin_profiles', 'chatbot_leads', 'chatbot_intakes', 'chatbot_consent_events',
    'chatbot_audit_logs', 'chatbot_knowledge_sources', 'chatbot_knowledge_documents',
    'chatbot_delivery_attempts', 'chatbot_rate_limits'
  ] loop
    execute format('alter table public.%I enable row level security', relation);
    execute format('revoke all on table public.%I from public, anon, authenticated, service_role', relation);
  end loop;
end
$$;

grant select on public.chatbot_admin_profiles, public.chatbot_leads, public.chatbot_intakes,
  public.chatbot_audit_logs, public.chatbot_knowledge_sources, public.chatbot_knowledge_documents,
  public.chatbot_delivery_attempts, public.chatbot_rate_limits to service_role;
grant insert on public.chatbot_leads, public.chatbot_intakes, public.chatbot_consent_events,
  public.chatbot_audit_logs, public.chatbot_delivery_attempts, public.chatbot_rate_limits,
  public.chatbot_knowledge_sources, public.chatbot_knowledge_documents to service_role;
grant update (status, assigned_to, updated_at) on public.chatbot_intakes to service_role;
grant update (status, provider_id, updated_at) on public.chatbot_delivery_attempts to service_role;
grant update (consumed, expires_at), delete on public.chatbot_rate_limits to service_role;
grant update (status) on public.chatbot_knowledge_sources to service_role;

create function public.chatbot_consume_budget(limits jsonb)
returns boolean language plpgsql security invoker set search_path = '' as $$
declare
  entry record;
  counter integer;
begin
  if jsonb_typeof(limits) is distinct from 'array' or jsonb_array_length(limits) not between 1 and 4 then
    return false;
  end if;
  delete from public.chatbot_rate_limits where bucket in (
    select bucket from public.chatbot_rate_limits where expires_at < now() - interval '1 day'
    order by expires_at for update skip locked limit 30
  );
  for entry in
    select * from jsonb_to_recordset(limits) as l(bucket text, maximum integer, expires timestamptz)
      order by l.bucket
  loop
    if entry.maximum is null or entry.maximum < 1 or entry.expires <= now() then
      return false;
    end if;
    perform pg_advisory_xact_lock(hashtextextended(entry.bucket, 19340));
    select consumed into counter from public.chatbot_rate_limits
      where bucket = entry.bucket and expires_at > now();
    if coalesce(counter, 0) >= entry.maximum then return false; end if;
  end loop;
  insert into public.chatbot_rate_limits(bucket, consumed, expires_at)
    select l.bucket, 1, l.expires from jsonb_to_recordset(limits) as l(bucket text, expires timestamptz)
    on conflict (bucket) do update set
      consumed = case when chatbot_rate_limits.expires_at <= now() then 1
        else chatbot_rate_limits.consumed + 1 end,
      expires_at = excluded.expires_at;
  return true;
end
$$;

create function public.chatbot_submit_intake(
  request_id uuid, first_name text, contact text, area public.chatbot_area, summary text,
  channel text, priority text, notice_version text, draft_digest text
) returns uuid language plpgsql security invoker set search_path = '' as $$
declare
  new_lead uuid := gen_random_uuid();
begin
  perform pg_advisory_xact_lock(hashtextextended(request_id::text, 19341));
  if exists (select 1 from public.chatbot_intakes where id = request_id) then
    return request_id;
  end if;
  insert into public.chatbot_leads(id, first_name, contact)
    values (new_lead, first_name, contact);
  insert into public.chatbot_intakes(id, lead_id, area, summary, channel, priority)
    values (request_id, new_lead, area, summary, channel, priority);
  insert into public.chatbot_consent_events(intake_id, purpose, notice_version, draft_digest)
    values (request_id, 'solicitar_atendimento', notice_version, draft_digest);
  insert into public.chatbot_delivery_attempts(intake_id, channel, status)
    values (request_id, channel, case when channel = 'email' then 'pendente' else 'link_gerado' end);
  return request_id;
end
$$;

create function public.chatbot_search_knowledge(question text, selected_area public.chatbot_area)
returns table(id uuid, title text, url text, checked_on date, excerpt text)
language sql stable security invoker set search_path = '' as $$
  select d.id, s.title, s.url, s.checked_on, d.excerpt
  from public.chatbot_knowledge_documents d
  join public.chatbot_knowledge_sources s on s.id = d.source_id
  cross join websearch_to_tsquery('portuguese'::regconfig, question) q
  where s.status = 'approved' and s.checked_on <= current_date and s.review_until >= current_date
    and d.area = selected_area and d.search @@ q
  order by ts_rank(d.search, q) desc, d.id
  limit 3
$$;

create function public.chatbot_update_intake(
  actor_id uuid, request_id uuid, next_status public.chatbot_status,
  change_assignee boolean, next_assignee uuid
) returns boolean language plpgsql security invoker set search_path = '' as $$
declare
  staff_role public.chatbot_staff_role;
  existing public.chatbot_intakes;
  assignee uuid;
begin
  select role into staff_role from public.chatbot_admin_profiles
    where user_id = actor_id and active;
  if not found then return false; end if;
  select * into existing from public.chatbot_intakes where id = request_id for update;
  if not found or (staff_role = 'advogado' and existing.assigned_to is distinct from actor_id)
    or (change_assignee and staff_role <> 'administrador') then
    return false;
  end if;
  assignee := existing.assigned_to;
  if change_assignee then
    if next_assignee is not null and not exists (
      select 1 from public.chatbot_admin_profiles where user_id = next_assignee and active
    ) then return false; end if;
    assignee := next_assignee;
  end if;
  if existing.status = next_status and existing.assigned_to is not distinct from assignee then
    return true;
  end if;
  update public.chatbot_intakes set status = next_status, assigned_to = assignee, updated_at = now()
    where id = request_id;
  insert into public.chatbot_audit_logs(actor, intake_id, action, changes)
    values (actor_id, request_id, 'atualizar_solicitacao', jsonb_build_object(
      'status_anterior', existing.status, 'status', next_status,
      'responsavel_anterior', existing.assigned_to, 'responsavel', assignee
    ));
  return true;
end
$$;

create function public.chatbot_claim_email()
returns uuid language plpgsql security invoker set search_path = '' as $$
declare
  claimed uuid;
begin
  update public.chatbot_delivery_attempts set status = 'incerto', updated_at = now()
    where channel = 'email' and status = 'processando' and updated_at < now() - interval '15 minutes';
  delete from public.chatbot_rate_limits where expires_at < now() - interval '1 day';
  update public.chatbot_delivery_attempts set status = 'processando', updated_at = now()
    where channel = 'email' and intake_id = (
      select d.intake_id from public.chatbot_delivery_attempts d
      join public.chatbot_intakes i on i.id = d.intake_id
      where d.channel = 'email' and d.status = 'pendente' and i.status <> 'cancelado'
      order by d.updated_at
      for update of d skip locked limit 1
    ) returning intake_id into claimed;
  return claimed;
end
$$;

create function public.chatbot_add_institutional_note(
  actor_id uuid, selected_area public.chatbot_area, source_title text, source_url text,
  approved_excerpt text, search_keywords text, expires_on date
) returns uuid language plpgsql security invoker set search_path = '' as $$
declare
  new_source uuid := gen_random_uuid();
begin
  if not exists (
    select 1 from public.chatbot_admin_profiles
    where user_id = actor_id and role = 'administrador' and active
  ) or expires_on < current_date or expires_on > current_date + 365 then
    return null;
  end if;
  insert into public.chatbot_knowledge_sources(id, institution, title, url, kind, version,
    checked_on, review_until, status)
  values (new_source, 'Fleming & Batista', source_title, source_url, 'institucional',
    new_source::text, current_date, expires_on, 'approved');
  insert into public.chatbot_knowledge_documents(source_id, area, excerpt, keywords)
  values (new_source, selected_area, approved_excerpt, search_keywords);
  insert into public.chatbot_audit_logs(actor, action, changes)
  values (actor_id, 'aprovar_nota_institucional', jsonb_build_object('fonte', new_source));
  return new_source;
end
$$;

create function public.chatbot_withdraw_institutional_note(actor_id uuid, source_id uuid)
returns boolean language plpgsql security invoker set search_path = '' as $$
begin
  if not exists (
    select 1 from public.chatbot_admin_profiles
    where user_id = actor_id and role = 'administrador' and active
  ) then return false; end if;
  update public.chatbot_knowledge_sources set status = 'withdrawn'
    where id = source_id and kind = 'institucional' and status = 'approved';
  if not found then return false; end if;
  insert into public.chatbot_audit_logs(actor, action, changes)
  values (actor_id, 'retirar_nota_institucional', jsonb_build_object('fonte', source_id));
  return true;
end
$$;

revoke execute on function
  public.chatbot_consume_budget(jsonb),
  public.chatbot_submit_intake(uuid, text, text, public.chatbot_area, text, text, text, text, text),
  public.chatbot_search_knowledge(text, public.chatbot_area),
  public.chatbot_update_intake(uuid, uuid, public.chatbot_status, boolean, uuid),
  public.chatbot_claim_email(),
  public.chatbot_add_institutional_note(uuid, public.chatbot_area, text, text, text, text, date),
  public.chatbot_withdraw_institutional_note(uuid, uuid)
from public, anon, authenticated, service_role;

grant execute on function
  public.chatbot_consume_budget(jsonb),
  public.chatbot_submit_intake(uuid, text, text, public.chatbot_area, text, text, text, text, text),
  public.chatbot_search_knowledge(text, public.chatbot_area),
  public.chatbot_update_intake(uuid, uuid, public.chatbot_status, boolean, uuid),
  public.chatbot_claim_email(),
  public.chatbot_add_institutional_note(uuid, public.chatbot_area, text, text, text, text, date),
  public.chatbot_withdraw_institutional_note(uuid, uuid)
to service_role;

commit;
