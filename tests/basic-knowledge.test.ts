import assert from "node:assert/strict";
import test from "node:test";

import type { LegalArea } from "../src/lib/chat/contracts";
import { basicFaq, findBasicKnowledge } from "../src/server/chat/basic-knowledge";

const checkedDate = new Date("2026-11-12T12:00:00Z");

test("Encontra conceitos básicos das áreas com fontes oficiais e data de conferência", () => {
  const questions: [LegalArea, string][] = [
    ["imobiliario", "O que é contrato de aluguel?"],
    ["imobiliario", "Quais documentos preciso para alugar um apartamento?"],
    ["imobiliario", "Que documentação preciso apresentar como inquilino?"],
    ["imobiliario", "Quero alugar uma casa, o que devo separar?"],
    ["imobiliario", "Qual a diferença entre escritura e registro?"],
    ["imobiliario", "O que é usucapião?"],
    ["civil", "O que é dano moral?"],
    ["familia", "Qual a diferença entre inventário e partilha?"],
    ["familia", "O que é regime de bens?"],
    ["consumidor", "O que é garantia legal?"],
    ["trabalhista", "O que é FGTS?"],
    ["trabalhista", "O que é rescisão?"],
    ["previdenciario", "O que é CNIS?"],
    ["previdenciario", "BPC é aposentadoria?"],
    ["cidadania", "Onde acompanhar nacionalidade portuguesa?"]
  ];
  for (const [area, question] of questions) {
    const sources = findBasicKnowledge([area], question, checkedDate);
    assert.ok(sources.length > 0, question);
    assert.ok(sources.length <= 3);
    for (const source of sources) {
      assert.match(source.url, /^https:\/\//);
      assert.equal(source.checked_on, "2026-11-12");
    }
  }
});

test("Desconsidera resumos antes da conferência ou após o prazo de revisão", () => {
  for (const date of ["2026-11-11", "2026-12-13"]) {
    assert.deepEqual(
      findBasicKnowledge(["imobiliario"], "usucapião", new Date(date)),
      []
    );
  }
});

test("A busca prioriza IDs de FAQs relevantes e ignora IDs desconhecidos ou de outra área", () => {
  const incomeSource = "fb000000-0000-4000-8000-000000000014";
  const sources = findBasicKnowledge(
    ["imobiliario"],
    "documentação para alugar um apartamento",
    checkedDate,
    [8, 999, 14]
  );
  assert.equal(sources[0].id, incomeSource);
  assert.equal(sources[1].id, "fb000000-0000-4000-8000-000000000012");
  assert.deepEqual(
    findBasicKnowledge(["imobiliario"], "", new Date("2026-12-13"), [14]),
    []
  );
});

test("Cada FAQ tem um número único e pode ser recuperada na própria área", () => {
  assert.equal(new Set(basicFaq.map(({ number }) => number)).size, basicFaq.length);
  for (const faq of basicFaq) {
    const [result] = findBasicKnowledge([faq.area], "", checkedDate, [faq.number]);
    assert.equal(result?.title, faq.title);
    assert.ok(result?.excerpt && result.reviewWhen);
    assert.match(result.url, /^https:\/\//);
  }
});

test("Não fornece uma fonte de outro assunto ou área", () => {
  assert.deepEqual(findBasicKnowledge(["familia"], "FGTS", checkedDate), []);
  assert.deepEqual(
    findBasicKnowledge(["imobiliario"], "direito de superfície", checkedDate),
    []
  );
});
