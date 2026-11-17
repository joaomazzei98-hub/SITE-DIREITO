import { z } from "zod";

export const legalAreas = {
  imobiliario: "Direito Imobiliário",
  civil: "Direito Civil",
  familia: "Família e Sucessões",
  consumidor: "Direito do Consumidor",
  trabalhista: "Direito Trabalhista",
  previdenciario: "Direito Previdenciário",
  cidadania: "Cidadania Europeia"
} as const;

export const areaSchema = z.enum([
  "imobiliario",
  "civil",
  "familia",
  "consumidor",
  "trabalhista",
  "previdenciario",
  "cidadania"
]);
export type LegalArea = keyof typeof legalAreas;

export const prioritySchema = z.enum(["regular", "elevada", "critica"]);
export const channelSchema = z.enum(["whatsapp", "email"]);
export const noticeVersion = "atendimento-v1";
export const maxMessageLength = 2000;
export const maxHistoryTurns = 4;
export const idleSessionMs = 30 * 60 * 1000;

const message = z.string().trim().min(1).max(maxMessageLength);

export const chatTurnSchema = z.strictObject({
  question: message,
  response: z.string().trim().min(1).max(2600)
});
export type ChatTurn = z.infer<typeof chatTurnSchema>;

export const chatRequestSchema = z.strictObject({
  message,
  previousQuestions: z.array(message).max(2).default([]),
  history: z.array(chatTurnSchema).max(maxHistoryTurns).default([])
});

export const sourceSchema = z.strictObject({
  id: z.uuid(),
  title: z.string().max(250),
  url: z.url({ protocol: /^https$/ }),
  checkedOn: z.iso.date()
});

export const chatReplySchema = z.strictObject({
  intent: z.enum(["informacao", "atendimento", "urgencia", "fora_do_escopo"]),
  legal_area: areaSchema.nullable(),
  secondary_areas: z.array(areaSchema).max(3),
  priority: prioritySchema,
  requires_human: z.boolean(),
  needs_more_information: z.boolean(),
  suggested_action: z.enum(["perguntar", "atendimento", "emergencia", "nenhuma"]),
  source_references: z.array(sourceSchema).max(3),
  response: z.string().min(1).max(2600)
});

export type ChatReply = z.infer<typeof chatReplySchema>;

const email = z.email().max(150);
const phone = z
  .string()
  .regex(/^\+?[0-9 ()-]{10,24}$/)
  .refine((value) => {
    const count = value.replace(/\D/g, "").length;
    return count >= 10 && count <= 15;
  }, "Informe um telefone válido.");

export const intakeDraftSchema = z
  .strictObject({
    firstName: z
      .string()
      .trim()
      .min(2)
      .max(50)
      .regex(/^[\p{L}][\p{L} '-]+$/u),
    contact: z.string().trim(),
    legalArea: areaSchema,
    summary: z.string().trim().min(12).max(700),
    channel: channelSchema
  })
  .superRefine((draft, context) => {
    if (!(draft.channel === "email" ? email : phone).safeParse(draft.contact).success) {
      context.addIssue({
        code: "custom",
        path: ["contact"],
        message: "Confira o contato informado."
      });
    }
  });

export type IntakeDraft = z.infer<typeof intakeDraftSchema>;

export const intakeConfirmationSchema = z.strictObject({
  draft: intakeDraftSchema,
  receipt: z.string().min(1).max(1200),
  confirmed: z.literal(true),
  noticeVersion: z.literal(noticeVersion)
});
