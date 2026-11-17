import { defineConfig } from "@playwright/test";

const origin = "http://127.0.0.1:3217";

export default defineConfig({
  testDir: "./tests/e2e",
  workers: 1,
  use: {
    baseURL: origin,
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    trace: "retain-on-failure"
  },
  webServer: {
    command: "npm run dev -- --hostname 127.0.0.1 --port 3217",
    url: origin,
    reuseExistingServer: !process.env.CI,
    timeout: 90_000,
    env: {
      CHATBOT_ENABLED: "1",
      CHATBOT_MODE: "demo",
      CHATBOT_SITE_ORIGIN: origin,
      CHATBOT_HANDOFF_ENABLED: "0",
      CHATBOT_ADMIN_ENABLED: "0",
      OPENAI_API_KEY: "demo-only",
      SUPABASE_URL: "",
      NODE_USE_SYSTEM_CA: "1"
    }
  }
});
