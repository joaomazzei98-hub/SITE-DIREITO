import assert from "node:assert/strict";
import test from "node:test";

import { containsIdentifiers, redactIdentifiers } from "../src/lib/chat/privacy";

// Synthetic identifiers reserved for tests. These are never sent to providers.
for (const identifier of [
  "000.000.000-00",
  "00000000000",
  "00.000.000/0000-00",
  "0000000-00.2026.0.00.0000",
  "+55 (11) 00000-0000",
  "(11) 0000-0000",
  "teste@example.invalid",
  "00000-000",
  "RG: 00.000.000-X",
  "passaporte AB000000",
  "NIS: 000.00000.00-0"
]) {
  test("Remove o identificador completo " + identifier, () => {
    assert.equal(
      redactIdentifiers("Dado " + identifier + ", uma dúvida de aluguel."),
      "Dado [dado removido], uma dúvida de aluguel."
    );
    assert.equal(containsIdentifiers(identifier), true);
    // Repeated calls must not depend on RegExp.lastIndex.
    assert.equal(containsIdentifiers(identifier), true);
  });
}

test("Preserva categorias de documentos, conceitos e prazos gerais", () => {
  for (const text of [
    "Quais documentos preciso para alugar? Identidade, CPF e comprovante de renda?",
    "A caução pode ser de 3 meses?",
    "Qual o prazo de 10 dias na rescisão?",
    "Meu aluguel é R$ 2.500,00, o contrato tem 30 meses.",
    "Onde consultar o CNIS e para que serve o NIS?"
  ]) {
    assert.equal(redactIdentifiers(text), text);
    assert.equal(containsIdentifiers(text), false);
  }
});

test("A filtragem não promete anonimização de nomes ou relatos sensíveis", () => {
  const text = "Meu nome é Pessoa de Teste e tenho uma dúvida sobre saúde.";
  assert.equal(redactIdentifiers(text), text);
});
