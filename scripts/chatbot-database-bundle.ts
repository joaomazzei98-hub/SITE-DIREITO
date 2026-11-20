import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";

export async function buildDatabaseBundle() {
  const migrations = new URL("../supabase/migrations/", import.meta.url);
  const files = (await readdir(migrations))
    .filter((name) => /^\d+_[a-z0-9_]+\.sql$/.test(name))
    .sort();
  if (files.length !== 3)
    throw new Error("Revise a lista de migrações antes de preparar o pacote.");
  const parts = await Promise.all(
    files.map(async (name) => {
      const sql = await readFile(new URL(name, migrations), "utf8");
      const checksum = createHash("sha256").update(sql).digest("hex");
      const body = sql.replace(/^\s*begin;\s*/i, "").replace(/\s*commit;\s*$/i, "");
      return `-- ${name}\n-- SHA-256 ${checksum}\n${body}\n`;
    })
  );
  return {
    files,
    sql:
      "-- Pacote para projeto NOVO e VAZIO. Não executar na homologação.\n-- Gerado de supabase/migrations. Nenhuma credencial ou dado de teste incluído.\n-- Não registra histórico da CLI; reconciliar antes de usar db push.\nbegin;\n\n" +
      parts.join("\n") +
      "\ncommit;\n"
  };
}
