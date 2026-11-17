import { z } from "zod";

export function chatbotMode() {
  if (process.env.CHATBOT_ENABLED !== "1") return "disabled";
  if (process.env.NODE_ENV === "development" && process.env.CHATBOT_MODE === "demo") {
    return "demo";
  }
  return process.env.CHATBOT_MODE === "live" ? "live" : "disabled";
}

export function databaseSettings() {
  const url = process.env.SUPABASE_URL;
  const secret = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !secret) return null;
  try {
    const parsed = new URL(url);
    if (
      parsed.protocol === "https:" ||
      (process.env.NODE_ENV === "development" && parsed.hostname === "127.0.0.1")
    ) {
      return { url, secret };
    }
  } catch {
    return null;
  }
  return null;
}

export function handoffEnabled() {
  return chatbotMode() === "live" && process.env.CHATBOT_HANDOFF_ENABLED === "1";
}

const emailSettingsSchema = z.object({
  key: z.string().min(10),
  from: z.email(),
  to: z.email(),
  siteOrigin: z.url({ protocol: /^https?$/ }),
  cronSecret: z.string().min(32)
});

export function emailSettings() {
  if (!handoffEnabled() || process.env.CHATBOT_EMAIL_ENABLED !== "1") return null;
  const config = emailSettingsSchema.safeParse({
    key: process.env.RESEND_API_KEY,
    from: process.env.CHATBOT_EMAIL_FROM,
    to: process.env.CHATBOT_EMAIL_TO,
    siteOrigin: process.env.CHATBOT_SITE_ORIGIN,
    cronSecret: process.env.CRON_SECRET
  });
  if (!config.success) return null;
  const origin = new URL(config.data.siteOrigin);
  if (origin.origin !== config.data.siteOrigin) return null;
  const localTest =
    process.env.NODE_ENV === "development" &&
    origin.hostname === "127.0.0.1" &&
    ["delivered@resend.dev", "bounced@resend.dev"].includes(config.data.to);
  if (origin.protocol !== "https:" && !localTest) return null;
  return config.data;
}

export function availableChannels(): ("whatsapp" | "email")[] {
  if (!handoffEnabled()) return [];
  const channels: ("whatsapp" | "email")[] = [];
  if (/^[1-9]\d{10,14}$/.test(process.env.CHATBOT_WHATSAPP_NUMBER ?? "")) {
    channels.push("whatsapp");
  }
  if (emailSettings()) channels.push("email");
  return channels;
}
