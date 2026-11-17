import { readFile, readdir } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";

export async function createTestDatabase() {
  const db = new PGlite();
  try {
    await db.exec(
      "create schema auth; create table auth.users (id uuid primary key); create role anon; create role authenticated; create role service_role bypassrls;"
    );
    const migrations = (await readdir("supabase/migrations"))
      .filter((name) => name.endsWith(".sql"))
      .sort();
    for (const migration of migrations) {
      await db.exec(await readFile("supabase/migrations/" + migration, "utf8"));
    }
    return db;
  } catch (error) {
    await db.close();
    throw error;
  }
}
