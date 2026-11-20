import assert from "node:assert/strict";
import test from "node:test";
import { PGlite } from "@electric-sql/pglite";

import { buildDatabaseBundle } from "../scripts/chatbot-database-bundle";

test("O pacote de produção instala as três migrações em uma única transação no banco vazio", async () => {
  const db = new PGlite();
  try {
    await db.exec(
      "create schema auth; create table auth.users(id uuid primary key); create role anon; create role authenticated; create role service_role bypassrls;"
    );
    const bundle = await buildDatabaseBundle();
    await db.exec(bundle.sql);
    assert.equal(bundle.files.length, 3);
    assert.equal(
      (
        await db.query<{ area: string }>(
          "select 'cidadania'::public.chatbot_area as area"
        )
      ).rows[0].area,
      "cidadania"
    );
    assert.equal((await db.query("select * from public.chatbot_intakes")).rows.length, 0);
    assert.equal(
      (await db.query("select * from public.chatbot_admin_profiles")).rows.length,
      0
    );
    for (const role of ["anon", "authenticated"]) {
      await db.exec("set role " + role);
      await assert.rejects(
        db.query("select * from public.chatbot_leads"),
        /permission denied/
      );
      await assert.rejects(
        db.query("select * from public.chatbot_intakes"),
        /permission denied/
      );
      await db.exec("reset role");
    }
    const security = await db.query<{ relrowsecurity: boolean }>(
      "select relrowsecurity from pg_class join pg_namespace n on n.oid=relnamespace where n.nspname='public' and relname like 'chatbot_%' and relkind='r'"
    );
    assert.ok(security.rows.length >= 10);
    assert.ok(security.rows.every((row) => row.relrowsecurity));
    assert.deepEqual(
      (
        await db.query(
          "select * from public.chatbot_search_knowledge('aluguel','imobiliario')"
        )
      ).rows,
      []
    );
  } finally {
    await db.close();
  }
});
