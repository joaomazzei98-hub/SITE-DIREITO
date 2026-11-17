begin;

-- A verified provider callback may arrive before the sender saves its email ID.
create table public.chatbot_pending_email_events (
  provider_id uuid primary key,
  status text not null check (status in ('entregue', 'falhou')),
  received_at timestamptz not null default now()
);
create index chatbot_pending_email_events_received_at
  on public.chatbot_pending_email_events(received_at);

alter table public.chatbot_pending_email_events enable row level security;
revoke all on public.chatbot_pending_email_events from public, anon, authenticated, service_role;
grant select, insert, update, delete on public.chatbot_pending_email_events to service_role;

create function public.chatbot_record_email_event(message_id uuid, outcome text)
returns boolean language plpgsql security invoker set search_path = '' as $$
declare
  current_status text;
begin
  if message_id is null or outcome is null or outcome not in ('entregue', 'falhou') then
    return false;
  end if;
  perform pg_advisory_xact_lock(hashtextextended(message_id::text, 19342));

  select status into current_status from public.chatbot_delivery_attempts
    where provider_id = message_id::text and channel = 'email' for update;
  if found then
    if current_status = 'aceito' or (current_status = 'entregue' and outcome = 'falhou') then
      update public.chatbot_delivery_attempts set status = outcome, updated_at = now()
        where provider_id = message_id::text and channel = 'email';
    end if;
    return true;
  end if;

  delete from public.chatbot_pending_email_events where provider_id in (
    select provider_id from public.chatbot_pending_email_events
      where received_at < now() - interval '1 day' order by received_at
      for update skip locked limit 30
  );
  insert into public.chatbot_pending_email_events(provider_id, status)
    values (message_id, outcome)
    on conflict (provider_id) do update set status = excluded.status
      where excluded.status = 'falhou' and chatbot_pending_email_events.status <> 'falhou';
  return true;
end
$$;

create function public.chatbot_finalize_email(request_id uuid, outcome text, message_id uuid)
returns text language plpgsql security invoker set search_path = '' as $$
declare
  early_outcome text;
  saved_status text;
begin
  if request_id is null or outcome is null or outcome not in ('aceito', 'falhou', 'incerto')
    or ((outcome = 'aceito') is distinct from (message_id is not null)) then
    return null;
  end if;
  if message_id is not null then
    perform pg_advisory_xact_lock(hashtextextended(message_id::text, 19342));
    select status into early_outcome from public.chatbot_pending_email_events
      where provider_id = message_id;
  end if;
  update public.chatbot_delivery_attempts
    set status = coalesce(early_outcome, outcome), provider_id = message_id::text, updated_at = now()
    where intake_id = request_id and channel = 'email' and status = 'processando'
    returning status into saved_status;
  if saved_status is not null and early_outcome is not null then
    delete from public.chatbot_pending_email_events where provider_id = message_id;
  end if;
  return saved_status;
end
$$;

revoke execute on function
  public.chatbot_record_email_event(uuid, text),
  public.chatbot_finalize_email(uuid, text, uuid)
from public, anon, authenticated, service_role;

grant execute on function
  public.chatbot_record_email_event(uuid, text),
  public.chatbot_finalize_email(uuid, text, uuid)
to service_role;

commit;
