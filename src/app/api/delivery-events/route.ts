import { Webhook } from "svix";
import { z } from "zod";

import { serviceDatabase } from "@/server/chat/database";
import { boundedBody, json } from "@/server/chat/http";

const eventSchema = z.object({
  type: z.string(),
  data: z.object({ email_id: z.uuid() })
});

export async function POST(request: Request) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) return json({ error: "Indisponível." }, 404);
  const body = await boundedBody(request, 32_000);
  const id = request.headers.get("svix-id");
  const timestamp = request.headers.get("svix-timestamp");
  const signature = request.headers.get("svix-signature");
  if (!body || !id || !timestamp || !signature)
    return json({ error: "Evento inválido." }, 400);

  let event: z.infer<typeof eventSchema>;
  try {
    new Webhook(secret).verify(body, {
      "svix-id": id,
      "svix-timestamp": timestamp,
      "svix-signature": signature
    });
    event = eventSchema.parse(JSON.parse(body));
  } catch {
    return json({ error: "Evento inválido." }, 400);
  }
  const status =
    event.type === "email.delivered"
      ? "entregue"
      : ["email.bounced", "email.failed"].includes(event.type)
        ? "falhou"
        : null;
  if (!status) return json({ received: true });
  try {
    const result = await serviceDatabase().rpc("chatbot_record_email_event", {
      message_id: event.data.email_id,
      outcome: status
    });
    return result.error || result.data !== true
      ? json({ error: "Evento indisponível." }, 503)
      : json({ received: true });
  } catch {
    return json({ error: "Evento indisponível." }, 503);
  }
}
