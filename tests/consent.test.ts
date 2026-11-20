import assert from "node:assert/strict";
import test from "node:test";

import {
  intakeConfirmationSchema,
  intakeDraftSchema,
  noticeVersion,
  type IntakeDraft
} from "../src/lib/chat/contracts";
import {
  createIntakeReceipt,
  intakeContainsIdentifiers,
  validateIntakeReceipt
} from "../src/server/chat/intake";
import { newSession, readSession, sign } from "../src/server/chat/session";

const secret = "synthetic-signing-secret-used-only-in-local-tests";
const now = Date.parse("2026-11-05T20:00:00Z");
const visitor = newSession(now);
const draft: IntakeDraft = {
  firstName: "Exemplo",
  contact: "teste@example.invalid",
  legalArea: "imobiliario",
  summary: "Quero saber como revisar um contrato fictício.",
  channel: "email"
};
const receipt = createIntakeReceipt(draft, visitor.id, secret, now);

test("Confirma somente o resumo revisado na mesma sessão", () => {
  assert.ok(validateIntakeReceipt(receipt, draft, visitor.id, secret, now));
});

for (const edit of [
  { firstName: "Outro" },
  { legalArea: "civil" },
  { summary: "Outro resumo para análise." },
  { contact: "outro@example.invalid" },
  { channel: "whatsapp" }
]) {
  test("Exige nova confirmação após editar " + Object.keys(edit)[0], () => {
    assert.equal(
      validateIntakeReceipt(
        receipt,
        { ...draft, ...edit } as IntakeDraft,
        visitor.id,
        secret,
        now
      ),
      null
    );
  });
}

test("Bloqueia protocolo de outro visitante", () => {
  assert.equal(
    validateIntakeReceipt(receipt, draft, newSession(now).id, secret, now),
    null
  );
});

test("Rejeita confirmação expirada ou adulterada", () => {
  assert.equal(
    validateIntakeReceipt(receipt, draft, visitor.id, secret, now + 600_000),
    null
  );
  assert.equal(
    validateIntakeReceipt(receipt + "0", draft, visitor.id, secret, now),
    null
  );
});

test("A recusa ou a ausência de confirmação não passa na validação", () => {
  for (const confirmed of [undefined, false, "true"]) {
    assert.equal(
      intakeConfirmationSchema.safeParse({ draft, receipt, confirmed, noticeVersion })
        .success,
      false
    );
  }
});

test("Bloqueia documentos no resumo e contato incompatível com o canal", () => {
  assert.ok(
    intakeContainsIdentifiers({ ...draft, summary: "CPF fictício 000.000.000-00." })
  );
  assert.equal(
    intakeDraftSchema.safeParse({ ...draft, channel: "whatsapp" }).success,
    false
  );
});

test("Expira a sessão inativa", () => {
  const token = sign("session", visitor, secret);
  assert.ok(readSession(token, secret, now));
  assert.equal(readSession(token, secret, now + 30 * 60 * 1000), null);
});

test("O resumo recusa identificadores sem alterar o contato autorizado", () => {
  for (const summary of [
    "Processo 0000000-00.2026.0.00.0000 para análise.",
    "Empresa de CNPJ 00.000.000/0000-00 para análise.",
    "Residência no CEP 00000-000 para análise.",
    "Outro contato (11) 00000-0000 para análise.",
    "Meu RG: 00.000.000-X para análise."
  ]) {
    assert.equal(intakeContainsIdentifiers({ ...draft, summary }), true);
  }
  assert.equal(intakeContainsIdentifiers(draft), false);
  assert.equal(intakeDraftSchema.safeParse(draft).success, true);
});

test("Uma confirmação com a versão anterior do aviso exige nova revisão", () => {
  assert.equal(
    intakeConfirmationSchema.safeParse({
      draft,
      receipt,
      confirmed: true,
      noticeVersion: "atendimento-v1"
    }).success,
    false
  );
});
