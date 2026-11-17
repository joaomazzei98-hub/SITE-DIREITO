import { isIP } from "node:net";

import { serviceDatabase } from "./database";
import { digest } from "./session";
import { chatbotMode } from "./settings";

type Budget = { bucket: string; maximum: number; expires: string };
const demoCounters = new Map<string, { count: number; expires: number }>();

function ipBucket(request: Request, secret: string) {
  const forwarded =
    process.env.VERCEL === "1"
      ? request.headers.get("x-vercel-forwarded-for")?.trim()
      : undefined;
  return digest(forwarded && isIP(forwarded) ? forwarded : "shared", secret);
}

export async function consumeBudget(
  kind: "session" | "intake" | "login",
  request: Request,
  secret: string,
  now = Date.now()
) {
  const hour = Math.floor(now / 3_600_000);
  const hourEnd = new Date((hour + 1) * 3_600_000).toISOString();
  const ip = ipBucket(request, secret);
  const caps = { session: 20, intake: 8, login: 12 };
  const budgets: Budget[] = [
    { bucket: kind + ":ip:" + hour + ":" + ip, maximum: caps[kind], expires: hourEnd }
  ];

  if (chatbotMode() === "demo") {
    for (const [key, value] of demoCounters) {
      if (value.expires <= now) demoCounters.delete(key);
    }
    if (
      budgets.some(
        ({ bucket, maximum }) => (demoCounters.get(bucket)?.count ?? 0) >= maximum
      )
    ) {
      return false;
    }
    for (const { bucket, expires } of budgets) {
      demoCounters.set(bucket, {
        count: (demoCounters.get(bucket)?.count ?? 0) + 1,
        expires: Date.parse(expires)
      });
    }
    return true;
  }

  const { data, error } = await serviceDatabase().rpc("chatbot_consume_budget", {
    limits: budgets
  });
  if (error) throw new Error("Budget unavailable");
  return data === true;
}
