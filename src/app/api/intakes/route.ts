import type { NextRequest } from "next/server";
import { z } from "zod";

import { intakeConfirmationSchema, intakeDraftSchema } from "@/lib/chat/contracts";
import { serviceDatabase } from "@/server/chat/database";
import { boundedJson, json, sameOrigin } from "@/server/chat/http";
import {
  createIntakeReceipt,
  intakeContainsIdentifiers,
  validateIntakeReceipt
} from "@/server/chat/intake";
import { consumeBudget } from "@/server/chat/limits";
import { readSession, sessionCookie, signingSecret } from "@/server/chat/session";
import { availableChannels } from "@/server/chat/settings";
import { priorityFor } from "@/server/chat/triage";

const inputSchema = z.discriminatedUnion("action", [
  z.strictObject({ action: z.literal("preview"), draft: intakeDraftSchema }),
  z.strictObject({ action: z.literal("confirm"), confirmation: intakeConfirmationSchema })
]);

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return json({ error: "Origem inválida." }, 403);
  const channels = availableChannels();
  const secret = signingSecret();
  if (!channels.length || !secret)
    return json({ error: "Encaminhamento indisponível." }, 503);
  const session = readSession(request.cookies.get(sessionCookie)?.value, secret);
  if (!session)
    return json({ error: "A sessão terminou. Reabra o chat para continuar." }, 401);
  const result = inputSchema.safeParse(await boundedJson(request, 6000));
  if (!result.success)
    return json({ error: "Confira o nome, o contato e o resumo." }, 400);

  const input = result.data;
  const draft = input.action === "preview" ? input.draft : input.confirmation.draft;
  if (!channels.includes(draft.channel))
    return json({ error: "Escolha um canal disponível." }, 400);
  if (intakeContainsIdentifiers(draft))
    return json(
      {
        error: "Remova documentos, telefones, CEPs, números longos e e-mails do resumo."
      },
      400
    );

  try {
    if (!(await consumeBudget("intake", request, secret))) {
      return json({ error: "Limite temporário atingido." }, 429);
    }
    if (input.action === "preview") {
      return json({ receipt: createIntakeReceipt(draft, session.id, secret), draft });
    }
    const { receipt, noticeVersion } = input.confirmation;
    const confirmed = validateIntakeReceipt(receipt, draft, session.id, secret);
    if (!confirmed) return json({ error: "Revise o resumo e confirme novamente." }, 409);
    const { error } = await serviceDatabase().rpc("chatbot_submit_intake", {
      request_id: confirmed.id,
      first_name: draft.firstName,
      contact: draft.contact,
      area: draft.legalArea,
      summary: draft.summary,
      channel: draft.channel,
      priority: priorityFor(draft.summary),
      notice_version: noticeVersion,
      draft_digest: confirmed.fingerprint
    });
    if (error)
      return json(
        { error: "Não foi possível registrar a solicitação. Tente novamente." },
        503
      );
    if (draft.channel === "email") {
      return json({
        message:
          "Solicitação registrada. A notificação ao escritório está na fila de envio."
      });
    }
    const message =
      "Olá, gostaria de continuar meu atendimento. Protocolo: " + confirmed.id;
    return json({
      message:
        "Solicitação registrada. Abra o WhatsApp e envie a mensagem quando quiser.",
      whatsappUrl:
        "https://wa.me/" +
        process.env.CHATBOT_WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(message)
    });
  } catch {
    return json(
      { error: "Não foi possível registrar a solicitação. Tente novamente." },
      503
    );
  }
}
