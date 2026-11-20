import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { buildDatabaseBundle } from "./chatbot-database-bundle";

async function main() {
  const bundle = await buildDatabaseBundle();
  const output = new URL("../.tools/banco-producao.sql", import.meta.url);
  await mkdir(new URL("../.tools/", import.meta.url), { recursive: true });
  await writeFile(output, bundle.sql, "utf8");
  console.log(
    JSON.stringify({
      migrations: bundle.files,
      output: fileURLToPath(output),
      executed: false
    })
  );
}

void main().catch(() => {
  console.error(
    "Não foi possível preparar o pacote. Nenhuma conexão com banco foi realizada."
  );
  process.exitCode = 1;
});
