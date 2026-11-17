import { randomUUID } from "node:crypto";
import { z } from "zod";

import { noticeVersion, type IntakeDraft } from "@/lib/chat/contracts";
import { digest, sign, verify } from "./session";

const receiptSchema = z.strictObject({
  id: z.uuid(),
  sessionId: z.uuid(),
  fingerprint: z.string().length(43),
  expires: z.number().int()
});

function fingerprint(draft: IntakeDraft, secret: string) {
  return digest(
    JSON.stringify([
      noticeVersion,
      draft.firstName,
      draft.contact,
      draft.legalArea,
      draft.summary,
      draft.channel
    ]),
    secret
  );
}

export function createIntakeReceipt(
  draft: IntakeDraft,
  sessionId: string,
  secret: string,
  now = Date.now()
) {
  return sign(
    "intake",
    {
      id: randomUUID(),
      sessionId,
      fingerprint: fingerprint(draft, secret),
      expires: now + 10 * 60 * 1000
    },
    secret
  );
}

export function validateIntakeReceipt(
  token: string,
  draft: IntakeDraft,
  sessionId: string,
  secret: string,
  now = Date.now()
) {
  const receipt = receiptSchema.safeParse(verify("intake", token, secret));
  if (
    !receipt.success ||
    receipt.data.sessionId !== sessionId ||
    receipt.data.expires <= now ||
    receipt.data.fingerprint !== fingerprint(draft, secret)
  )
    return null;
  return receipt.data;
}

export function intakeContainsIdentifiers(draft: IntakeDraft) {
  return /\b(?:\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{6,})\b|[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(
    draft.summary
  );
}
