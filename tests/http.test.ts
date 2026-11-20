import assert from "node:assert/strict";
import test from "node:test";

import { actionRequest, sameOrigin } from "../src/server/chat/http";

test("Confere a origem configurada, as duas URLs da prévia e a exigência em produção", (t) => {
  const keys = [
    "NODE_ENV",
    "CHATBOT_SITE_ORIGIN",
    "VERCEL",
    "VERCEL_ENV",
    "VERCEL_URL",
    "VERCEL_BRANCH_URL"
  ];
  const original = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  t.after(() => {
    for (const key of keys) {
      if (original[key] === undefined) delete process.env[key];
      else process.env[key] = original[key];
    }
  });

  const preview = "https://site-unique.vercel.app";
  const branch = "https://site-git-chatbot.vercel.app";
  const canonical = "https://www.flemingbatista.com.br";
  const request = (origin?: string) =>
    new Request(preview + "/api/chat", {
      headers: origin === undefined ? {} : { Origin: origin }
    });
  for (const key of keys) delete process.env[key];
  Object.assign(process.env, {
    NODE_ENV: "production",
    VERCEL: "1",
    VERCEL_ENV: "preview",
    VERCEL_URL: "site-unique.vercel.app",
    VERCEL_BRANCH_URL: "site-git-chatbot.vercel.app"
  });
  assert.equal(sameOrigin(request(preview)), true);
  assert.equal(sameOrigin(request(branch)), true);
  for (const origin of [
    undefined,
    "null",
    canonical,
    "http://site-unique.vercel.app",
    preview + ".example.invalid",
    "https://another-project.vercel.app",
    preview + "/"
  ]) {
    assert.equal(sameOrigin(request(origin)), false, String(origin));
  }

  process.env.CHATBOT_SITE_ORIGIN = canonical;
  assert.equal(sameOrigin(request(canonical)), true);
  assert.equal(sameOrigin(request(preview)), false);
  delete process.env.CHATBOT_SITE_ORIGIN;

  process.env.VERCEL_ENV = "production";
  assert.equal(sameOrigin(request(preview)), false);
  assert.equal(sameOrigin(request(branch)), false);
  process.env.CHATBOT_SITE_ORIGIN = canonical;
  assert.equal(sameOrigin(request(canonical)), true);
  delete process.env.CHATBOT_SITE_ORIGIN;

  process.env.VERCEL_ENV = "preview";
  delete process.env.VERCEL;
  assert.equal(sameOrigin(request(preview)), false);
  delete process.env.VERCEL_URL;
  delete process.env.VERCEL_BRANCH_URL;
  process.env.VERCEL = "1";
  assert.equal(sameOrigin(request(preview)), false);

  Object.assign(process.env, { NODE_ENV: "development" });
  assert.equal(sameOrigin(request(preview)), true);
  assert.equal(sameOrigin(request(branch)), false);
});

test("Ações do painel aceitam origem vazia configurada em Preview sem aceitar outro site", (t) => {
  const keys = [
    "NODE_ENV",
    "CHATBOT_SITE_ORIGIN",
    "VERCEL",
    "VERCEL_ENV",
    "VERCEL_URL",
    "VERCEL_BRANCH_URL"
  ];
  const before = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  t.after(() => {
    for (const key of keys) {
      if (before[key] === undefined) delete process.env[key];
      else process.env[key] = before[key];
    }
  });
  Object.assign(process.env, {
    NODE_ENV: "production",
    CHATBOT_SITE_ORIGIN: "",
    VERCEL: "1",
    VERCEL_ENV: "preview",
    VERCEL_URL: "site-unique.vercel.app",
    VERCEL_BRANCH_URL: "site-git-chatbot.vercel.app"
  });
  const headers = new Headers({
    host: "site-unique.vercel.app",
    origin: "https://site-unique.vercel.app"
  });
  assert.ok(actionRequest(headers));
  headers.set("origin", "https://site-git-chatbot.vercel.app");
  assert.ok(actionRequest(headers));
  headers.set("origin", "https://attacker.example.invalid");
  assert.equal(actionRequest(headers), null);
  headers.delete("origin");
  assert.equal(actionRequest(headers), null);
  headers.set("origin", "https://site-unique.vercel.app");
  process.env.VERCEL_ENV = "production";
  assert.equal(actionRequest(headers), null);
  process.env.CHATBOT_SITE_ORIGIN = "https://www.flemingbatista.com.br";
  headers.set("origin", process.env.CHATBOT_SITE_ORIGIN);
  assert.ok(actionRequest(headers));
  process.env.CHATBOT_SITE_ORIGIN = "not-a-url";
  assert.equal(actionRequest(headers), null);
});
