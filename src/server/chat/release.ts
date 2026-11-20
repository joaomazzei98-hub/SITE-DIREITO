import { basicFaqReviewUntil } from "./basic-knowledge";

export type ReleaseEnvironment = "preview" | "production";
type Environment = Record<string, string | undefined>;
type Check = { id: string; status: "pass" | "fail" | "manual"; message: string };

function httpsOrigin(value: string | undefined) {
  try {
    const url = new URL(value ?? "");
    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      !url.port &&
      url.origin === value
    );
  } catch {
    return false;
  }
}

function databaseHost(value: string | undefined) {
  try {
    const url = new URL(value ?? "");
    return url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      !url.port &&
      url.pathname === "/" &&
      !url.search &&
      !url.hash &&
      /^[a-z0-9]+\.supabase\.co$/.test(url.hostname)
      ? url.hostname
      : null;
  } catch {
    return null;
  }
}

const realEmail = (value: string | undefined) =>
  Boolean(
    value &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) &&
    !/@(?:resend\.dev|example\.(?:com|org|net|invalid))$/i.test(value)
  );

export function checkRelease(
  environment: ReleaseEnvironment,
  env: Environment,
  staging: Environment = {},
  now = new Date()
) {
  const checks: Check[] = [];
  const check = (id: string, passed: boolean, message: string) =>
    checks.push({ id, status: passed ? "pass" : "fail", message });
  const manual = (id: string, message: string) =>
    checks.push({ id, status: "manual", message });
  const present = (name: string, minimum = 1) =>
    (env[name]?.trim().length ?? 0) >= minimum;
  check(
    "runtime",
    env.CHATBOT_ENABLED === "1" && env.CHATBOT_MODE === "live",
    "Chat habilitado em modo integrado."
  );
  check(
    "deployment-target",
    !env.VERCEL_ENV || env.VERCEL_ENV === environment,
    "Ambiente de destino corresponde à configuração verificada."
  );
  check(
    "openai",
    present("OPENAI_API_KEY", 20) && present("OPENAI_MODEL"),
    "Chave e modelo da OpenAI preenchidos no servidor."
  );
  check(
    "signing",
    present("CHATBOT_SIGNING_SECRET", 43),
    "Segredo de sessão com pelo menos 43 caracteres."
  );
  check(
    "database",
    Boolean(databaseHost(env.SUPABASE_URL)) &&
      present("SUPABASE_SERVICE_KEY", 20) &&
      present("SUPABASE_PUBLISHABLE_KEY", 20) &&
      env.SUPABASE_SERVICE_KEY !== env.SUPABASE_PUBLISHABLE_KEY,
    "URL Supabase válida e chaves distintas de servidor e publicação."
  );
  for (const flag of [
    "CHATBOT_ADMIN_ENABLED",
    "CHATBOT_HANDOFF_ENABLED",
    "CHATBOT_EMAIL_ENABLED"
  ]) {
    check(
      flag,
      ["0", "1"].includes(env[flag] ?? ""),
      `${flag} definido explicitamente como 0 ou 1.`
    );
  }
  const origin = env.CHATBOT_SITE_ORIGIN;
  check(
    "origin",
    (environment === "preview" && !origin) || httpsOrigin(origin),
    "Origem HTTPS exata; somente Preview admite origem automática vazia."
  );
  if (environment === "production") {
    check(
      "canonical",
      origin === "https://www.flemingbatista.com.br" &&
        env.NEXT_PUBLIC_SITE_URL === origin,
      "Domínio canônico confirmado na Vercel e consistente com o chat."
    );
    const productionHost = databaseHost(env.SUPABASE_URL);
    const stagingHost = databaseHost(staging.SUPABASE_URL);
    check(
      "database-isolation",
      Boolean(productionHost && stagingHost && productionHost !== stagingHost),
      "Banco de produção separado do banco de homologação informado."
    );
    check(
      "session-isolation",
      Boolean(staging.CHATBOT_SIGNING_SECRET) &&
        present("CHATBOT_SIGNING_SECRET", 43) &&
        env.CHATBOT_SIGNING_SECRET !== staging.CHATBOT_SIGNING_SECRET,
      "Segredo de sessão de produção diferente do segredo de homologação."
    );
  }
  const handoff = env.CHATBOT_HANDOFF_ENABLED === "1";
  const email = env.CHATBOT_EMAIL_ENABLED === "1";
  const whatsapp = /^[1-9]\d{10,14}$/.test(env.CHATBOT_WHATSAPP_NUMBER ?? "");
  check(
    "handoff",
    !handoff || (env.CHATBOT_ADMIN_ENABLED === "1" && (whatsapp || email)),
    "Pedidos armazenados têm um canal disponível e painel para acompanhamento."
  );
  if (email) {
    check(
      "email-dependencies",
      handoff && env.CHATBOT_ADMIN_ENABLED === "1" && httpsOrigin(origin),
      "E-mail depende de atendimento, painel e origem explícita para o link de notificação."
    );
    check(
      "email",
      present("RESEND_API_KEY", 10) &&
        realEmail(env.CHATBOT_EMAIL_FROM) &&
        realEmail(env.CHATBOT_EMAIL_TO),
      "Chave Resend e endereços de remetente e destinatário fora do modo de teste."
    );
    check(
      "webhook",
      /^whsec_\S{20,}$/.test(env.RESEND_WEBHOOK_SECRET ?? ""),
      "Segredo de assinatura do webhook permanente preenchido."
    );
    check(
      "queue",
      present("CRON_SECRET", 32) && env.CRON_SECRET !== env.CHATBOT_SIGNING_SECRET,
      "Autorização do processador da fila preenchida e diferente do segredo de sessão."
    );
    manual(
      "email-verification",
      "Conferir domínio remetente verificado no Resend, agendamento da fila, webhook permanente e evento de entrega real. Gerar URL não confirma entrega."
    );
  }
  check(
    "faq-validity",
    now.toISOString().slice(0, 10) <= basicFaqReviewUntil,
    "Catálogo dentro do prazo técnico de revisão, sem prorrogação automática."
  );
  if (env.CHATBOT_ADMIN_ENABLED === "1") {
    manual(
      "staff",
      "Conferir cadastro público desativado, TOTP habilitado, primeiro perfil ativo e login com segundo fator no banco de destino."
    );
  }
  if (environment === "production") {
    manual(
      "database-verification",
      "Aplicar e conferir as três migrações no projeto novo, RLS, permissões e rotinas de backup. Não executar db push sobre histórico não reconciliado."
    );
    manual(
      "release-approval",
      "Registrar autorização de produção para o commit e conferir como reverter. Validar domínio, conversa e contato após publicar."
    );
  }
  manual(
    "content-review",
    "Revisão jurídica das respostas adiada por solicitação do usuário. O relatório não registra aprovação jurídica."
  );
  return {
    environment,
    configurationValid: !checks.some((item) => item.status === "fail"),
    checks
  };
}
