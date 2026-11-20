import assert from "node:assert/strict";
import test from "node:test";

import { checkRelease } from "../src/server/chat/release";

const staging = {
  SUPABASE_URL: "https://stagingproject.supabase.co",
  CHATBOT_SIGNING_SECRET: "staging-signing-secret-".repeat(3)
};
const production = {
  CHATBOT_ENABLED: "1",
  CHATBOT_MODE: "live",
  OPENAI_API_KEY: "synthetic-openai-key-for-release-tests",
  OPENAI_MODEL: "test-model",
  CHATBOT_SIGNING_SECRET: "production-signing-secret-".repeat(3),
  SUPABASE_URL: "https://productionproject.supabase.co",
  SUPABASE_PUBLISHABLE_KEY: "synthetic-publishable-key",
  SUPABASE_SERVICE_KEY: "synthetic-service-key-different",
  CHATBOT_SITE_ORIGIN: "https://www.flemingbatista.com.br",
  NEXT_PUBLIC_SITE_URL: "https://www.flemingbatista.com.br",
  CHATBOT_ADMIN_ENABLED: "1",
  CHATBOT_HANDOFF_ENABLED: "1",
  CHATBOT_WHATSAPP_NUMBER: "5511000000000",
  CHATBOT_EMAIL_ENABLED: "0"
};
const now = new Date("2026-11-19T15:00:00Z");
const failed = (changes: Record<string, string>, id: string) => {
  const report = checkRelease("production", { ...production, ...changes }, staging, now);
  assert.equal(report.configurationValid, false);
  assert.equal(report.checks.find((c) => c.id === id)?.status, "fail");
};

test("A checagem aceita configuração de produção separada sem alegar verificação manual", () => {
  const report = checkRelease("production", production, staging, now);
  assert.equal(report.configurationValid, true);
  assert.ok(report.checks.some((c) => c.status === "manual" && c.id === "staff"));
  assert.ok(
    report.checks.some((c) => c.status === "manual" && c.id === "content-review")
  );
  assert.doesNotMatch(
    JSON.stringify(report),
    /synthetic|productionproject\.supabase|5511000000000/
  );
});

test("Preview aceita origem automática e controles desativados", () => {
  const report = checkRelease(
    "preview",
    {
      ...production,
      CHATBOT_SITE_ORIGIN: "",
      CHATBOT_ADMIN_ENABLED: "0",
      CHATBOT_HANDOFF_ENABLED: "0"
    },
    {},
    now
  );
  assert.equal(report.configurationValid, true);
});

test("Produção rejeita reutilização ou ausência da referência de homologação", () => {
  failed({ SUPABASE_URL: staging.SUPABASE_URL }, "database-isolation");
  failed({ CHATBOT_SIGNING_SECRET: staging.CHATBOT_SIGNING_SECRET }, "session-isolation");
  const withoutStaging = checkRelease("production", production, {}, now);
  assert.equal(withoutStaging.configurationValid, false);
});

test("Produção exige origem canônica HTTPS e não aceita destinos ou credenciais inválidos", () => {
  for (const origin of [
    "",
    "http://www.flemingbatista.com.br",
    "https://www.flemingbatista.com.br/",
    "https://user:secret@www.flemingbatista.com.br"
  ]) {
    failed({ CHATBOT_SITE_ORIGIN: origin }, "origin");
  }
  failed({ NEXT_PUBLIC_SITE_URL: "https://site-antigo.example.invalid" }, "canonical");
  failed({ VERCEL_ENV: "preview" }, "deployment-target");
  failed({ SUPABASE_URL: "https://evil.example.invalid" }, "database");
  failed({ SUPABASE_SERVICE_KEY: production.SUPABASE_PUBLISHABLE_KEY }, "database");
  failed({ CHATBOT_SIGNING_SECRET: "short" }, "signing");
  failed({ CHATBOT_ADMIN_ENABLED: "0" }, "handoff");
  failed({ CHATBOT_EMAIL_ENABLED: "true" }, "CHATBOT_EMAIL_ENABLED");
});

test("E-mail requer configuração completa e conserva verificações de entrega pendentes", () => {
  const email = {
    ...production,
    CHATBOT_EMAIL_ENABLED: "1",
    RESEND_API_KEY: "synthetic-resend-key",
    CHATBOT_EMAIL_FROM: "notificacoes@escritorio.invalid",
    CHATBOT_EMAIL_TO: "equipe@escritorio.invalid",
    RESEND_WEBHOOK_SECRET: "whsec_" + "x".repeat(32),
    CRON_SECRET: "queue-secret-".repeat(4)
  };
  assert.equal(checkRelease("production", email, staging, now).configurationValid, true);
  for (const edits of [
    { CHATBOT_EMAIL_FROM: "onboarding@resend.dev" },
    { CHATBOT_EMAIL_TO: "delivered@resend.dev" },
    { RESEND_WEBHOOK_SECRET: "" },
    { CRON_SECRET: production.CHATBOT_SIGNING_SECRET },
    { CHATBOT_HANDOFF_ENABLED: "0" }
  ]) {
    assert.equal(
      checkRelease("production", { ...email, ...edits }, staging, now).configurationValid,
      false
    );
  }
  assert.equal(
    checkRelease("production", email, staging, now).checks.find(
      (c) => c.id === "email-verification"
    )?.status,
    "manual"
  );
});

test("A checagem sinaliza a validade técnica vencida sem aprovar respostas", () => {
  const report = checkRelease(
    "production",
    production,
    staging,
    new Date("2026-12-13T12:00:00Z")
  );
  assert.equal(report.checks.find((c) => c.id === "faq-validity")?.status, "fail");
});
