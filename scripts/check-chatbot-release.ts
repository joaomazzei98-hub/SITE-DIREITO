import { readFile } from "node:fs/promises";
import { parseEnv } from "node:util";

import { checkRelease, type ReleaseEnvironment } from "../src/server/chat/release";

async function main() {
  const options = new Map(
    process.argv.slice(2).map((arg) => {
      const separator = arg.indexOf("=");
      return separator < 0
        ? [arg, ""]
        : [arg.slice(0, separator), arg.slice(separator + 1)];
    })
  );
  const environment = options.get("--environment");
  if (
    !["preview", "production"].includes(environment ?? "") ||
    [...options.keys()].some(
      (key) => !["--environment", "--env-file", "--staging-env-file"].includes(key)
    )
  ) {
    throw new Error(
      "Use --environment=preview|production --env-file=arquivo.local e, para produção, --staging-env-file=arquivo.local."
    );
  }
  const file = options.get("--env-file");
  if (!file || !file.endsWith(".local"))
    throw new Error("Informe um arquivo local de ambiente terminado em .local.");
  const env = parseEnv(await readFile(file, "utf8"));
  const stagingFile = options.get("--staging-env-file");
  const staging = stagingFile ? parseEnv(await readFile(stagingFile, "utf8")) : {};
  // Only check descriptions and statuses are printed. No env value is emitted.
  const report = checkRelease(environment as ReleaseEnvironment, env, staging);
  console.log(JSON.stringify(report, null, 2));
  if (!report.configurationValid) process.exitCode = 1;
}

void main().catch(() => {
  console.error(
    "Não foi possível conferir a configuração. Verifique os argumentos e a existência dos arquivos locais. Nenhum segredo foi exibido e nenhuma configuração foi alterada."
  );
  process.exitCode = 1;
});
