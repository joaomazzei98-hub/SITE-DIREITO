import { type NextRequest } from "next/server";

import { availableChannels, chatbotMode, databaseSettings } from "@/server/chat/settings";
import { json, sameOrigin } from "@/server/chat/http";
import { consumeBudget } from "@/server/chat/limits";
import { newSession, setSession, signingSecret } from "@/server/chat/session";

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return json({ error: "Origem inválida." }, 403);
  const mode = chatbotMode();
  const secret = signingSecret();
  if (mode === "disabled" || !secret || (mode === "live" && !databaseSettings())) {
    return json({ error: "O chat está indisponível. Use o contato do escritório." }, 503);
  }
  try {
    if (!(await consumeBudget("session", request, secret))) {
      return json(
        { error: "Limite temporário atingido. Use o contato do escritório." },
        429
      );
    }
    return setSession(
      json({ demo: mode === "demo", channels: availableChannels() }),
      newSession(),
      secret
    );
  } catch {
    return json({ error: "Não foi possível iniciar a conversa. Tente novamente." }, 503);
  }
}
