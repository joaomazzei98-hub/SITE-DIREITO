import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { z } from "zod";

import { Container } from "@/components/ui/container";
import { areaSchema, legalAreas, prioritySchema } from "@/lib/chat/contracts";
import {
  adminEnabled,
  adminStatuses,
  adminStatusSchema,
  staffAuth,
  staffState
} from "@/server/chat/admin";
import { serviceDatabase } from "@/server/chat/database";
import {
  addInstitutionalNote,
  signIn,
  signOut,
  updateIntake,
  verifyTotp,
  withdrawInstitutionalNote
} from "./actions";
import { TotpEnrollment } from "./totp-enrollment";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Atendimentos",
  robots: { index: false, follow: false }
};

const inputClass = "mt-1 block w-full rounded-lg border-petrol/30 text-sm";
const buttonClass =
  "min-h-11 rounded-lg bg-petrol px-4 py-2 text-sm font-semibold text-white";
const adminNotices: Record<string, string> = {
  login: "Não foi possível entrar. Confira as credenciais.",
  mfa: "Confira o código do autenticador.",
  atualizacao: "Não foi possível atualizar a solicitação.",
  indisponivel: "O serviço está temporariamente indisponível.",
  salvo: "Solicitação atualizada.",
  fonte_salva: "Informação institucional publicada na base do assistente.",
  fonte_retirada: "Informação institucional retirada da base.",
  fonte_invalida:
    "Não foi possível atualizar a base. Confira os campos e a data de revisão."
};
const intakeRow = z.object({
  id: z.uuid(),
  area: areaSchema,
  summary: z.string(),
  priority: prioritySchema,
  channel: z.string(),
  status: adminStatusSchema,
  assigned_to: z.uuid().nullable(),
  created_at: z.string(),
  lead: z.object({ first_name: z.string(), contact: z.string() }),
  delivery: z.array(z.object({ status: z.string() })).default([])
});

export default async function AdminPage({
  searchParams
}: {
  searchParams: Promise<{
    estado?: string;
    status?: string;
    area?: string;
    prioridade?: string;
  }>;
}) {
  if (!adminEnabled()) notFound();
  const params = await searchParams;
  const message =
    params.estado && Object.hasOwn(adminNotices, params.estado)
      ? adminNotices[params.estado]
      : null;
  const auth = await staffAuth();
  const state = await staffState(auth).catch(() => null);

  return (
    <section className="bg-ivory py-12 text-petrol">
      <Container className="space-y-5">
        <h1 className="font-serif text-4xl">Atendimentos</h1>
        {message && (
          <p role="status" className="rounded-lg border border-petrol/20 bg-white p-3">
            {message}
          </p>
        )}
        {!state && <p>O serviço está temporariamente indisponível.</p>}
        {state?.state === "login" && (
          <form action={signIn} className="max-w-sm space-y-3">
            <label className="block">
              E-mail
              <input
                type="email"
                name="email"
                required
                autoComplete="username"
                className={inputClass}
              />
            </label>
            <label className="block">
              Senha
              <input
                type="password"
                name="password"
                required
                autoComplete="current-password"
                className={inputClass}
              />
            </label>
            <button type="submit" className={buttonClass}>
              Entrar
            </button>
          </form>
        )}
        {state?.state === "denied" && <p>Esta conta não tem acesso ao painel.</p>}
        {state?.state === "mfa" && <MfaForm auth={auth} />}
        {state?.state === "ready" && (
          <IntakeList profile={state.profile} params={params} />
        )}
        {state?.state === "ready" && state.profile.role === "administrador" && (
          <InstitutionalNotes />
        )}
        {state && state.state !== "login" && (
          <form action={signOut}>
            <button type="submit" className="min-h-11 underline">
              Sair da conta
            </button>
          </form>
        )}
      </Container>
    </section>
  );
}

async function MfaForm({ auth }: { auth: Awaited<ReturnType<typeof staffAuth>> }) {
  const { data, error } = await auth.auth.mfa.listFactors();
  if (error) return <p>Não foi possível acessar o autenticador.</p>;
  const factor = data.totp[0];
  if (!factor && data.all.some((item) => item.status === "verified")) {
    return (
      <p>Esta conta precisa de um autenticador TOTP configurado para usar o painel.</p>
    );
  }
  return factor ? (
    <form action={verifyTotp} className="max-w-sm space-y-3">
      <input type="hidden" name="factor" value={factor.id} />
      <label className="block">
        Código do autenticador
        <input
          required
          name="code"
          inputMode="numeric"
          pattern="[0-9]{6}"
          autoComplete="one-time-code"
          className={inputClass}
        />
      </label>
      <button type="submit" className={buttonClass}>
        Verificar
      </button>
    </form>
  ) : (
    <TotpEnrollment />
  );
}

async function IntakeList({
  profile,
  params
}: {
  profile: { user_id: string; display_name: string; role: string };
  params: { status?: string; area?: string; prioridade?: string };
}) {
  const database = serviceDatabase();
  let query = database
    .from("chatbot_intakes")
    .select(
      "id, area, summary, priority, channel, status, assigned_to, created_at, lead:chatbot_leads(first_name,contact), delivery:chatbot_delivery_attempts(status)"
    )
    .order("created_at", { ascending: false })
    .limit(50);
  if (profile.role === "advogado") query = query.eq("assigned_to", profile.user_id);
  const area = areaSchema.safeParse(params.area);
  const status = adminStatusSchema.safeParse(params.status);
  const priority = prioritySchema.safeParse(params.prioridade);
  if (area.success) query = query.eq("area", area.data);
  if (status.success) query = query.eq("status", status.data);
  if (priority.success) query = query.eq("priority", priority.data);
  const rows = await query;
  const intakes = z.array(intakeRow).safeParse(rows.data);
  if (rows.error || !intakes.success) return <p>Não foi possível carregar a fila.</p>;
  const assignees =
    profile.role === "administrador"
      ? await database
          .from("chatbot_admin_profiles")
          .select("user_id, display_name")
          .eq("active", true)
          .order("display_name")
      : null;
  const history = intakes.data.length
    ? await database
        .from("chatbot_audit_logs")
        .select("id, intake_id, action, created_at")
        .in(
          "intake_id",
          intakes.data.map((intake) => intake.id)
        )
        .order("created_at", { ascending: false })
        .limit(100)
    : null;

  return (
    <div className="space-y-4">
      <p>Olá, {profile.display_name}. A fila mostra até 50 solicitações recentes.</p>
      <form action="/admin" className="flex flex-wrap items-end gap-3">
        <label>
          Prioridade
          <select
            name="prioridade"
            defaultValue={priority.data ?? ""}
            className={inputClass}
          >
            <option value="">Todas</option>
            <option value="regular">Regular</option>
            <option value="elevada">Elevada</option>
            <option value="critica">Crítica</option>
          </select>
        </label>
        <label>
          Área
          <select name="area" defaultValue={area.data ?? ""} className={inputClass}>
            <option value="">Todas</option>
            {Object.entries(legalAreas).map(([key, label]) => (
              <option value={key} key={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Status
          <select name="status" defaultValue={status.data ?? ""} className={inputClass}>
            <option value="">Todos</option>
            {Object.entries(adminStatuses).map(([key, label]) => (
              <option value={key} key={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className={buttonClass}>
          Filtrar
        </button>
      </form>
      {!intakes.data.length && <p>Nenhuma solicitação disponível.</p>}
      {intakes.data.map((intake) => (
        <article
          key={intake.id}
          className="space-y-3 rounded-xl border border-petrol/15 bg-white p-4"
        >
          <h2 className="font-serif text-xl">
            {legalAreas[intake.area]} · {adminStatuses[intake.status]}
          </h2>
          <p className="text-sm">
            Prioridade: {intake.priority} · {intake.channel} ·{" "}
            {intake.delivery[0]?.status ?? "sem registro"}
          </p>
          <p className="break-words text-sm">
            {intake.lead.first_name} · {intake.lead.contact}
          </p>
          <p className="whitespace-pre-line break-words">{intake.summary}</p>
          <form action={updateIntake} className="flex flex-wrap items-end gap-3">
            <input type="hidden" name="id" value={intake.id} />
            <label>
              Status
              <select name="status" defaultValue={intake.status} className={inputClass}>
                {Object.entries(adminStatuses).map(([key, label]) => (
                  <option value={key} key={key}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            {assignees?.data && (
              <label>
                Responsável
                <select
                  name="assignee"
                  defaultValue={intake.assigned_to ?? ""}
                  className={inputClass}
                >
                  <option value="">Sem responsável</option>
                  {assignees.data.map((item) => (
                    <option key={item.user_id} value={item.user_id}>
                      {item.display_name}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <button type="submit" className={buttonClass}>
              Salvar
            </button>
          </form>
          <details className="text-sm">
            <summary className="cursor-pointer">Histórico</summary>
            <ul className="mt-2 space-y-1">
              <li>
                Criado em{" "}
                {new Date(intake.created_at).toLocaleString("pt-BR", {
                  timeZone: "America/Sao_Paulo"
                })}
              </li>
              {history?.data
                ?.filter((entry) => entry.intake_id === intake.id)
                .map((entry) => (
                  <li key={entry.id}>
                    Solicitação atualizada em{" "}
                    {new Date(entry.created_at).toLocaleString("pt-BR", {
                      timeZone: "America/Sao_Paulo"
                    })}
                  </li>
                ))}
            </ul>
          </details>
        </article>
      ))}
    </div>
  );
}

async function InstitutionalNotes() {
  const { data, error } = await serviceDatabase()
    .from("chatbot_knowledge_sources")
    .select("id, title, review_until")
    .eq("kind", "institucional")
    .eq("status", "approved")
    .order("checked_on", { ascending: false })
    .limit(20);
  return (
    <details className="space-y-3 rounded-xl border border-petrol/15 bg-white p-4">
      <summary className="cursor-pointer font-semibold">
        Informações institucionais do assistente
      </summary>
      <form action={addInstitutionalNote} className="max-w-2xl space-y-3">
        <label className="block">
          Título
          <input required name="title" maxLength={250} className={inputClass} />
        </label>
        <label className="block">
          Página oficial do escritório
          <input required name="url" type="url" maxLength={400} className={inputClass} />
        </label>
        <label className="block">
          Área
          <select required name="area" className={inputClass}>
            {Object.entries(legalAreas).map(([key, label]) => (
              <option value={key} key={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          Texto revisado
          <textarea
            required
            name="excerpt"
            rows={3}
            minLength={20}
            maxLength={1400}
            className={inputClass}
          />
        </label>
        <label className="block">
          Palavras-chave
          <input name="keywords" maxLength={250} className={inputClass} />
        </label>
        <label className="block">
          Revisar até
          <input required type="date" name="review" className={inputClass} />
        </label>
        <label className="flex items-start gap-2">
          <input type="checkbox" required name="approved" />
          <span>
            Conferi esta informação na página oficial e autorizo sua exibição pelo
            assistente.
          </span>
        </label>
        <button type="submit" className={buttonClass}>
          Publicar na base
        </button>
      </form>
      {error && <p>Não foi possível carregar as notas institucionais.</p>}
      {data?.map((note) => (
        <form
          key={note.id}
          action={withdrawInstitutionalNote}
          className="flex items-center justify-between gap-3 border-t border-petrol/15 pt-2 text-sm"
        >
          <input type="hidden" name="sourceId" value={note.id} />
          <p>
            {note.title} · Revisão até {note.review_until}
          </p>
          <button type="submit" className="min-h-11 underline">
            Retirar da base
          </button>
        </form>
      ))}
    </details>
  );
}
