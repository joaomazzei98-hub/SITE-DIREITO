import { createHmac, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import type { NextResponse } from "next/server";
import { z } from "zod";

import { idleSessionMs } from "@/lib/chat/contracts";
import { chatbotMode } from "./settings";

const developmentState = globalThis as typeof globalThis & {
  flemingChatDemoSecret?: string;
};
const absoluteSessionMs = 2 * 60 * 60 * 1000;
export const sessionCookie = "fb_chat_session";
const sessionSchema = z.strictObject({
  id: z.uuid(),
  started: z.number(),
  seen: z.number()
});
export type ChatSession = z.infer<typeof sessionSchema>;

export function signingSecret() {
  if (chatbotMode() === "demo") {
    developmentState.flemingChatDemoSecret ??= randomBytes(32).toString("base64url");
    return developmentState.flemingChatDemoSecret;
  }
  const secret = process.env.CHATBOT_SIGNING_SECRET;
  return secret && secret.length >= 43 ? secret : null;
}

export function digest(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

export function sign(kind: string, value: unknown, secret: string) {
  const body = Buffer.from(JSON.stringify(value)).toString("base64url");
  return body + "." + digest(kind + ":" + body, secret);
}

export function verify(kind: string, token: string, secret: string): unknown {
  const [body, signature, extra] = token.split(".");
  if (!body || !signature || extra !== undefined || token.length > 1200) return null;
  const expected = Buffer.from(digest(kind + ":" + body, secret));
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received))
    return null;
  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

export function readSession(value: string | undefined, secret: string, now = Date.now()) {
  if (!value) return null;
  const result = sessionSchema.safeParse(verify("session", value, secret));
  if (!result.success) return null;
  const session = result.data;
  if (
    session.started > session.seen ||
    session.seen > now ||
    now - session.seen >= idleSessionMs ||
    now - session.started >= absoluteSessionMs
  )
    return null;
  return session;
}

export function newSession(now = Date.now()): ChatSession {
  return { id: randomUUID(), started: now, seen: now };
}

export function setSession(response: NextResponse, session: ChatSession, secret: string) {
  const now = Date.now();
  response.cookies.set(
    sessionCookie,
    sign("session", { ...session, seen: now }, secret),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/api",
      maxAge: Math.max(
        0,
        Math.floor(
          Math.min(idleSessionMs, absoluteSessionMs - (now - session.started)) / 1000
        )
      )
    }
  );
  return response;
}
