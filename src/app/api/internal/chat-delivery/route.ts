import { timingSafeEqual } from "node:crypto";
import { z } from "zod";

import { serviceDatabase } from "@/server/chat/database";
import { json } from "@/server/chat/http";
import { emailSettings } from "@/server/chat/settings";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const config = emailSettings();
  if (!config) return json({ error: "Indisponível." }, 404);
  const expected = Buffer.from("Bearer " + config.cronSecret);
  const supplied = Buffer.from(request.headers.get("authorization") ?? "");
  if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) {
    return json({ error: "Acesso negado." }, 401);
  }

  try {
    const database = serviceDatabase();
    const { data, error } = await database.rpc("chatbot_claim_email");
    if (error) return json({ error: "Fila indisponível." }, 503);
    if (data === null) return json({ processed: false });
    const intake = z.uuid().parse(data);

    let status = "incerto";
    let providerId: string | null = null;
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + config.key,
          "Content-Type": "application/json",
          "Idempotency-Key": "chatbot-intake-" + intake
        },
        body: JSON.stringify({
          from: config.from,
          to: [config.to],
          subject: "Nova solicitação de atendimento",
          text:
            "Uma solicitação autorizada está disponível no painel: " +
            config.siteOrigin +
            "/admin"
        }),
        signal: AbortSignal.timeout(8000)
      });
      if (response.ok) {
        providerId = z.object({ id: z.uuid() }).parse(await response.json()).id;
        status = "aceito";
      } else if (
        response.status >= 400 &&
        response.status < 500 &&
        ![408, 409, 429].includes(response.status)
      ) {
        status = "falhou";
      }
    } catch {
      // A timeout cannot establish whether the provider accepted the message.
    }

    const saved = await database.rpc("chatbot_finalize_email", {
      request_id: intake,
      outcome: status,
      message_id: providerId
    });
    return saved.error || !saved.data
      ? json({ error: "Fila indisponível." }, 503)
      : json({ processed: true, deliveryStatus: saved.data });
  } catch {
    return json({ error: "Fila indisponível." }, 503);
  }
}
