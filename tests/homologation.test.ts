import assert from "node:assert/strict";
import { randomBytes, randomUUID } from "node:crypto";
import test from "node:test";
import { NextRequest } from "next/server";
import { Webhook } from "svix";

import { POST as chat } from "../src/app/api/chat/route";
import { POST as start } from "../src/app/api/chat/session/route";
import { POST as deliveryEvent } from "../src/app/api/delivery-events/route";
import { POST as intake } from "../src/app/api/intakes/route";
import { GET as worker } from "../src/app/api/internal/chat-delivery/route";
import { noticeVersion } from "../src/lib/chat/contracts";
import { staffState } from "../src/server/chat/admin";
import { emailSettings } from "../src/server/chat/settings";
import { createTestDatabase } from "./fixtures/database";

const origin = "https://homologacao.example.invalid";
const databaseOrigin = "https://supabase.example.invalid";
const serviceKey = "synthetic-supabase-service-key";
const cronSecret = randomBytes(32).toString("base64url");
const webhookSecret = "whsec_" + randomBytes(32).toString("base64");
const draft = {
  firstName: "Pessoa Fictícia",
  contact: "visitante@example.invalid",
  legalArea: "imobiliario",
  channel: "email",
  summary: "Pedido fictício de análise de um contrato de locação."
};

const rpcArguments = new Map<string, string[]>([
  ["chatbot_consume_budget", ["limits"]],
  ["chatbot_search_knowledge", ["question", "selected_area"]],
  [
    "chatbot_submit_intake",
    [
      "request_id",
      "first_name",
      "contact",
      "area",
      "summary",
      "channel",
      "priority",
      "notice_version",
      "draft_digest"
    ]
  ],
  ["chatbot_claim_email", []],
  ["chatbot_record_email_event", ["message_id", "outcome"]],
  ["chatbot_finalize_email", ["request_id", "outcome", "message_id"]]
]);

function visitorRequest(path: string, client: number, cookie = "", data?: unknown) {
  return new NextRequest(origin + path, {
    method: "POST",
    headers: {
      Origin: origin,
      Cookie: cookie,
      "Content-Type": "application/json",
      "X-Vercel-Forwarded-For": "192.0.2." + client
    },
    body: data === undefined ? undefined : JSON.stringify(data)
  });
}

function callback(providerId: string, type: string, trusted = true) {
  const payload = JSON.stringify({ type, data: { email_id: providerId } });
  const now = new Date();
  const id = "msg_" + randomUUID();
  const signature = new Webhook(webhookSecret).sign(id, now, payload);
  return new Request(origin + "/api/delivery-events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "svix-id": id,
      "svix-timestamp": String(Math.floor(now.getTime() / 1000)),
      "svix-signature": trusted ? signature : "v1,invalid"
    },
    body: payload
  });
}

function jobRequest(authorized = true) {
  return new Request(origin + "/api/internal/chat-delivery", {
    headers: { Authorization: authorized ? "Bearer " + cronSecret : "Bearer invalid" }
  });
}

function identity(id: string | null, level: "aal1" | "aal2" = "aal1") {
  return {
    auth: {
      getUser: async () => ({ data: { user: id ? { id } : null } }),
      mfa: {
        getAuthenticatorAssuranceLevel: async () => ({
          data: { currentLevel: level, nextLevel: level },
          error: null
        })
      }
    }
  } as unknown as Parameters<typeof staffState>[0];
}

test("Homologação local do pedido e do e-mail com serviços externos simulados", async (t) => {
  const database = await createTestDatabase();
  t.after(() => database.close());
  const config: Record<string, string> = {
    CHATBOT_ENABLED: "1",
    CHATBOT_MODE: "live",
    CHATBOT_SITE_ORIGIN: origin,
    CHATBOT_SIGNING_SECRET: randomBytes(32).toString("base64url"),
    CHATBOT_HANDOFF_ENABLED: "1",
    CHATBOT_EMAIL_ENABLED: "1",
    CHATBOT_EMAIL_FROM: "onboarding@resend.dev",
    CHATBOT_EMAIL_TO: "delivered@resend.dev",
    SUPABASE_URL: databaseOrigin,
    SUPABASE_SERVICE_KEY: serviceKey,
    CRON_SECRET: cronSecret,
    RESEND_API_KEY: "synthetic-resend-key",
    RESEND_WEBHOOK_SECRET: webhookSecret,
    CHATBOT_WHATSAPP_NUMBER: "",
    OPENAI_API_KEY: "synthetic-openai-key",
    VERCEL: "1"
  };
  const previous = Object.fromEntries(
    Object.keys(config).map((key) => [key, process.env[key]])
  );
  Object.assign(process.env, config);
  t.after(() => {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });

  let outbound = 0;
  let classified = 0;
  let providerId = randomUUID();
  let providerResponse: "accepted" | "early" | "rejected" | "timeout" = "accepted";
  let failSubmit = false;
  let lastIdempotencyKey = "";

  t.mock.method(
    globalThis,
    "fetch",
    async (input: RequestInfo | URL, options?: RequestInit) => {
      const target = new URL(input instanceof Request ? input.url : input);
      const headers = new Headers(options?.headers);
      const body = typeof options?.body === "string" ? JSON.parse(options.body) : {};
      if (target.origin === databaseOrigin) {
        assert.equal(headers.get("apikey"), serviceKey);
        if (target.pathname === "/rest/v1/chatbot_admin_profiles") {
          const userId = target.searchParams.get("user_id")?.slice(3);
          assert.ok(userId);
          assert.equal(target.searchParams.get("active"), "eq.true");
          const profile = await database.transaction(async (tx) => {
            await tx.exec("set local role service_role");
            return tx.query(
              "select user_id, display_name, role from public.chatbot_admin_profiles where user_id=$1 and active",
              [userId]
            );
          });
          return Response.json(profile.rows);
        }
        const procedure = target.pathname.split("/").at(-1) ?? "";
        const keys = rpcArguments.get(procedure);
        assert.ok(keys, "RPC inesperada");
        if (failSubmit && procedure === "chatbot_submit_intake") {
          return Response.json(
            { code: "test_failure", message: "Falha sintética" },
            { status: 500 }
          );
        }
        const argumentsSql = keys.map((_, index) => "$" + (index + 1)).join(", ");
        const values = keys.map((key) =>
          key === "limits" ? JSON.stringify(body[key]) : (body[key] ?? null)
        );
        const rows = await database.transaction(async (tx) => {
          await tx.exec("set local role service_role");
          return tx.query<{ value: unknown }>(
            "select public." + procedure + "(" + argumentsSql + ") as value",
            values
          );
        });
        return Response.json(
          procedure === "chatbot_search_knowledge" ? [] : rows.rows[0].value
        );
      }
      if (target.href === "https://api.openai.com/v1/responses") {
        classified++;
        assert.equal(body.store, false);
        assert.ok(body.input[1].content.includes("[dado removido]"));
        assert.ok(!body.input[1].content.includes("000.000.000-00"));
        return Response.json({
          status: "completed",
          model: "fixture-model",
          output: [
            {
              type: "message",
              role: "assistant",
              content: [
                {
                  type: "output_text",
                  text: JSON.stringify(
                    body.text.format.name === "triagem_v5"
                      ? {
                          area: "imobiliario",
                          secondaryAreas: [],
                          intent: "informacao",
                          urgency: "regular",
                          searchTerms: ["escritura", "imóvel"],
                          faqNumbers: []
                        }
                      : {
                          response:
                            "Você quer organizar a documentação de um imóvel. O que deseja esclarecer sobre a escritura?",
                          needsMoreInformation: true,
                          canAnswer: true,
                          requiresHuman: false,
                          legalInformation: false,
                          usedSourceIds: []
                        }
                  ),
                  annotations: []
                }
              ]
            }
          ]
        });
      }
      assert.equal(target.href, "https://api.resend.com/emails");
      outbound++;
      lastIdempotencyKey = headers.get("idempotency-key") ?? "";
      assert.deepEqual(body.to, ["delivered@resend.dev"]);
      assert.equal(body.from, "onboarding@resend.dev");
      assert.ok(body.text.endsWith("/admin"));
      assert.ok(!JSON.stringify(body).includes(draft.contact));
      assert.ok(!JSON.stringify(body).includes(draft.summary));
      if (providerResponse === "early") {
        assert.equal(
          (await deliveryEvent(callback(providerId, "email.delivered"))).status,
          200
        );
      }
      if (providerResponse === "rejected") return Response.json({}, { status: 422 });
      if (providerResponse === "timeout") throw new Error("Timeout simulado");
      return Response.json({ id: providerId });
    }
  );

  async function session(client: number) {
    const response = await start(visitorRequest("/api/chat/session", client));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { demo: false, channels: ["email"] });
    return response.headers.get("set-cookie")!.split(";")[0];
  }

  async function review(client: number, cookie: string) {
    const response = await intake(
      visitorRequest("/api/intakes", client, cookie, { action: "preview", draft })
    );
    assert.equal(response.status, 200);
    const preview = await response.json();
    return {
      action: "confirm",
      confirmation: { ...preview, noticeVersion, confirmed: true }
    };
  }

  async function register(client: number) {
    const cookie = await session(client);
    const confirmation = await review(client, cookie);
    const response = await intake(
      visitorRequest("/api/intakes", client, cookie, confirmation)
    );
    assert.equal(response.status, 200);
  }

  await t.test(
    "Sessão integrada classifica por chamada estruturada e filtra identificadores",
    async () => {
      const cookie = await session(1);
      const response = await chat(
        visitorRequest("/api/chat", 1, cookie, {
          message: "Dúvida sobre escritura de imóvel. Número fictício: 000.000.000-00."
        })
      );
      assert.equal(response.status, 200);
      assert.equal((await response.json()).legal_area, "imobiliario");
      assert.equal(classified, 2);
    }
  );

  await t.test(
    "Conversa continua após as antigas cotas de quantidade de mensagens",
    async () => {
      const cookie = await session(200);
      const now = Date.now();
      const oldBuckets = [
        "message:day:" + Math.floor(now / 86_400_000),
        "message:month:" + new Date(now).toISOString().slice(0, 7)
      ];
      for (const bucket of oldBuckets) {
        await database.query(
          "insert into public.chatbot_rate_limits(bucket,consumed,expires_at) values ($1,100000,$2)",
          [bucket, new Date(now + 86_400_000).toISOString()]
        );
      }
      const before = await database.query(
        "select bucket,consumed from public.chatbot_rate_limits where bucket like 'message:%' order by bucket"
      );
      for (let index = 0; index < 65; index++) {
        const response = await chat(
          visitorRequest("/api/chat", 200, cookie, { message: "Direito Imobiliário" })
        );
        assert.equal(response.status, 200, "Mensagem " + (index + 1));
      }
      const after = await database.query(
        "select bucket,consumed from public.chatbot_rate_limits where bucket like 'message:%' order by bucket"
      );
      assert.deepEqual(after.rows, before.rows);
    }
  );

  await t.test(
    "Prévia e alterações não gravam dados, e confirmação repetida grava uma vez",
    async () => {
      const cookie = await session(2);
      const confirmation = await review(2, cookie);
      assert.equal(
        (await database.query("select * from public.chatbot_intakes")).rows.length,
        0
      );
      const edited = structuredClone(confirmation);
      edited.confirmation.draft.summary = "Resumo alterado após a confirmação original.";
      assert.equal(
        (await intake(visitorRequest("/api/intakes", 2, cookie, edited))).status,
        409
      );
      const otherCookie = await session(3);
      assert.equal(
        (await intake(visitorRequest("/api/intakes", 3, otherCookie, confirmation)))
          .status,
        409
      );
      for (let retry = 0; retry < 2; retry++) {
        assert.equal(
          (await intake(visitorRequest("/api/intakes", 2, cookie, confirmation))).status,
          200
        );
      }
      assert.equal(
        (await database.query("select * from public.chatbot_intakes")).rows.length,
        1
      );
      assert.equal(
        (await database.query("select * from public.chatbot_consent_events")).rows.length,
        1
      );
      assert.equal(outbound, 0);
    }
  );

  await t.test(
    "Somente a fila autorizada envia, e o evento antecipado é aplicado uma vez",
    async () => {
      assert.equal((await worker(jobRequest(false))).status, 401);
      assert.equal(
        (await deliveryEvent(callback(providerId, "email.delivered", false))).status,
        400
      );
      assert.equal(outbound, 0);
      providerResponse = "early";
      const processed = await worker(jobRequest());
      assert.equal(processed.status, 200);
      assert.deepEqual(await processed.json(), {
        processed: true,
        deliveryStatus: "entregue"
      });
      const rows = (
        await database.query<{ intake_id: string; status: string }>(
          "select intake_id, status from public.chatbot_delivery_attempts"
        )
      ).rows;
      assert.equal(rows[0].status, "entregue");
      assert.equal(lastIdempotencyKey, "chatbot-intake-" + rows[0].intake_id);
      assert.equal(
        (await database.query("select * from public.chatbot_pending_email_events")).rows
          .length,
        0
      );
      assert.deepEqual(await (await worker(jobRequest())).json(), { processed: false });
      assert.equal(outbound, 1);
    }
  );

  await t.test(
    "Aceite do provedor permanece distinto de entrega e de devolução",
    async () => {
      await register(4);
      providerId = randomUUID();
      providerResponse = "accepted";
      assert.deepEqual(await (await worker(jobRequest())).json(), {
        processed: true,
        deliveryStatus: "aceito"
      });
      assert.equal(
        (await deliveryEvent(callback(providerId, "email.bounced"))).status,
        200
      );
      assert.equal(
        (await deliveryEvent(callback(providerId, "email.delivered"))).status,
        200
      );
      const rows = (
        await database.query(
          "select status from public.chatbot_delivery_attempts where provider_id=$1",
          [providerId]
        )
      ).rows;
      assert.deepEqual(rows, [{ status: "falhou" }]);
    }
  );

  await t.test(
    "Rejeição e tempo excedido do provedor não geram entrega nem reenvio automático",
    async () => {
      for (const [client, result, expected] of [
        [5, "rejected", "falhou"],
        [6, "timeout", "incerto"]
      ] as const) {
        await register(client);
        providerResponse = result;
        assert.deepEqual(await (await worker(jobRequest())).json(), {
          processed: true,
          deliveryStatus: expected
        });
        assert.deepEqual(await (await worker(jobRequest())).json(), { processed: false });
      }
      assert.equal(outbound, 4);
    }
  );

  await t.test(
    "Falha na gravação não informa confirmação nem enfileira notificação",
    async () => {
      const cookie = await session(7);
      const confirmation = await review(7, cookie);
      failSubmit = true;
      const response = await intake(
        visitorRequest("/api/intakes", 7, cookie, confirmation)
      );
      assert.equal(response.status, 503);
      assert.equal(
        (await database.query("select * from public.chatbot_intakes")).rows.length,
        4
      );
      assert.deepEqual(await (await worker(jobRequest())).json(), { processed: false });
    }
  );

  await t.test(
    "Painel exige perfil ativo e segundo fator para toda a equipe",
    async () => {
      const admin = randomUUID();
      const inactive = randomUUID();
      await database.query("insert into auth.users values ($1),($2)", [admin, inactive]);
      await database.query(
        "insert into public.chatbot_admin_profiles values ($1,'Admin fictício','administrador',true),($2,'Inativo','atendente',false)",
        [admin, inactive]
      );
      assert.equal((await staffState(identity(null))).state, "login");
      assert.equal((await staffState(identity(inactive))).state, "denied");
      assert.equal((await staffState(identity(admin))).state, "mfa");
      assert.equal((await staffState(identity(admin, "aal2"))).state, "ready");
      for (const role of ["atendente", "advogado"] as const) {
        const staff = randomUUID();
        await database.query("insert into auth.users values ($1)", [staff]);
        await database.query(
          "insert into public.chatbot_admin_profiles values ($1,'Equipe de teste',$2,true)",
          [staff, role]
        );
        assert.equal((await staffState(identity(staff))).state, "mfa");
        assert.equal((await staffState(identity(staff, "aal2"))).state, "ready");
      }
    }
  );

  await t.test("HTTP local só habilita e-mail de teste em desenvolvimento", () => {
    const nodeEnv = process.env.NODE_ENV;
    try {
      Object.assign(process.env, { NODE_ENV: "development" });
      process.env.CHATBOT_SITE_ORIGIN = "http://127.0.0.1:3218";
      assert.ok(emailSettings());
      process.env.CHATBOT_EMAIL_TO = "visitante@example.invalid";
      assert.equal(emailSettings(), null);
      process.env.CHATBOT_EMAIL_TO = "delivered@resend.dev";
      Object.assign(process.env, { NODE_ENV: "production" });
      assert.equal(emailSettings(), null);
    } finally {
      if (nodeEnv === undefined) Reflect.deleteProperty(process.env, "NODE_ENV");
      else Object.assign(process.env, { NODE_ENV: nodeEnv });
    }
  });

  await t.test(
    "WhatsApp sozinho registra uma vez, gera link sem dados do visitante e não envia e-mail",
    async () => {
      const keys = [
        "CHATBOT_SITE_ORIGIN",
        "CHATBOT_EMAIL_ENABLED",
        "CHATBOT_WHATSAPP_NUMBER"
      ];
      const before = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
      const sentBefore = outbound;
      const countBefore = (await database.query("select * from public.chatbot_intakes"))
        .rows.length;
      try {
        Object.assign(process.env, {
          CHATBOT_SITE_ORIGIN: origin,
          CHATBOT_EMAIL_ENABLED: "0",
          CHATBOT_WHATSAPP_NUMBER: "5511000000000"
        });
        failSubmit = false;
        const started = await start(visitorRequest("/api/chat/session", 9));
        assert.equal(started.status, 200);
        assert.deepEqual(await started.json(), { demo: false, channels: ["whatsapp"] });
        const cookie = started.headers.get("set-cookie")!.split(";")[0];
        const whatsappDraft = {
          ...draft,
          firstName: "Visitante de teste",
          contact: "+55 (11) 00000-0000",
          channel: "whatsapp",
          summary: "Gostaria de atendimento para revisar uma locação."
        };
        const preview = await intake(
          visitorRequest("/api/intakes", 9, cookie, {
            action: "preview",
            draft: whatsappDraft
          })
        );
        assert.equal(preview.status, 200);
        assert.equal(
          (await database.query("select * from public.chatbot_intakes")).rows.length,
          countBefore
        );
        const confirmation = {
          action: "confirm",
          confirmation: { ...(await preview.json()), noticeVersion, confirmed: true }
        };
        let whatsappUrl = "";
        for (let attempt = 0; attempt < 2; attempt++) {
          const response = await intake(
            visitorRequest("/api/intakes", 9, cookie, confirmation)
          );
          assert.equal(response.status, 200);
          const result = await response.json();
          whatsappUrl = result.whatsappUrl;
          assert.match(result.message, /Abra o WhatsApp e envie/);
        }
        const rows = await database.query<{ id: string }>(
          "select id from public.chatbot_intakes where summary=$1 and channel='whatsapp'",
          [whatsappDraft.summary]
        );
        assert.equal(rows.rows.length, 1);
        assert.equal(
          (await database.query("select * from public.chatbot_intakes")).rows.length,
          countBefore + 1
        );
        const url = new URL(whatsappUrl);
        assert.equal(url.origin, "https://wa.me");
        assert.equal(url.pathname, "/5511000000000");
        assert.deepEqual([...url.searchParams.keys()], ["text"]);
        assert.equal(
          url.searchParams.get("text"),
          "Olá, gostaria de continuar meu atendimento. Protocolo: " + rows.rows[0].id
        );
        for (const data of [
          whatsappDraft.firstName,
          whatsappDraft.contact,
          whatsappDraft.summary
        ]) {
          assert.equal(url.searchParams.get("text")!.includes(data), false);
        }
        assert.deepEqual(
          (
            await database.query(
              "select channel,status from public.chatbot_delivery_attempts where intake_id=$1",
              [rows.rows[0].id]
            )
          ).rows,
          [{ channel: "whatsapp", status: "link_gerado" }]
        );
        const emailAttempt = await intake(
          visitorRequest("/api/intakes", 9, cookie, { action: "preview", draft })
        );
        assert.equal(emailAttempt.status, 400);
        assert.equal((await worker(jobRequest())).status, 404);
        assert.equal(outbound, sentBefore);
      } finally {
        for (const key of keys) {
          if (before[key] === undefined) delete process.env[key];
          else process.env[key] = before[key];
        }
      }
    }
  );
});
