import type { NextRequest } from "next/server";

import { chatReplySchema, chatRequestSchema } from "@/lib/chat/contracts";
import { answerWithAI } from "@/server/chat/ai";
import { boundedJson, json, sameOrigin } from "@/server/chat/http";
import {
  readSession,
  sessionCookie,
  setSession,
  signingSecret
} from "@/server/chat/session";
import { chatbotMode, databaseSettings } from "@/server/chat/settings";
import { ruleTriage } from "@/server/chat/triage";

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return json({ error: "Origem inválida." }, 403);
  const mode = chatbotMode();
  const secret = signingSecret();
  if (
    mode === "disabled" ||
    !secret ||
    (mode === "live" && (!process.env.OPENAI_API_KEY || !databaseSettings()))
  ) {
    return json({ error: "O chat está indisponível. Use o contato do escritório." }, 503);
  }
  const session = readSession(request.cookies.get(sessionCookie)?.value, secret);
  if (!session)
    return json({ error: "A sessão terminou. Reabra o chat para continuar." }, 401);
  const input = chatRequestSchema.safeParse(await boundedJson(request, 160_000));
  if (!input.success)
    return json({ error: "Confira o texto da mensagem e tente novamente." }, 400);

  try {
    const { message, previousQuestions, history } = input.data;
    const previous = history.length
      ? history.map((turn) => turn.question)
      : previousQuestions;
    const answer =
      mode === "demo"
        ? ruleTriage(message, previous)
        : await answerWithAI(message, previous, request.signal, history);
    return setSession(json(chatReplySchema.parse(answer)), session, secret);
  } catch {
    return json(
      {
        error:
          "Não foi possível responder agora. Selecione Atendimento humano para falar com a equipe."
      },
      503
    );
  }
}
