import { classifyQuestion } from "../src/server/chat/ai";
import { areaCases } from "./fixtures/triage";

async function main() {
  if (!process.env.OPENAI_API_KEY)
    throw new Error("Configure a chave local antes da avaliação.");
  const cases = Object.entries(areaCases).flatMap(([area, questions]) =>
    questions.map((question) => ({ area, question }))
  );
  let correct = 0;
  let checked = 0;
  for (const sample of cases) {
    try {
      const result = await classifyQuestion(
        sample.question,
        [],
        AbortSignal.timeout(15_000)
      );
      checked++;
      if (result?.area === sample.area) correct++;
      else
        console.log(
          JSON.stringify({
            case: checked,
            expected: sample.area,
            actual: result?.area ?? null
          })
        );
    } catch (error) {
      const failure = error as { status?: number; code?: string };
      console.error(
        JSON.stringify({
          completed: checked,
          total: cases.length,
          correct,
          status: typeof failure.status === "number" ? failure.status : null,
          creditExhausted: failure.code === "credit_balance_exhausted"
        })
      );
      process.exitCode = 1;
      return;
    }
  }
  const accuracy = correct / cases.length;
  console.log(JSON.stringify({ checked, correct, accuracy, target: 0.95 }));
  if (accuracy < 0.95) process.exitCode = 1;
}

void main().catch(() => {
  console.error("Não foi possível iniciar a avaliação com a configuração atual.");
  process.exitCode = 1;
});
