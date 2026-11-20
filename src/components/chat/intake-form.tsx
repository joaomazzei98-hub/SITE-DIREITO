"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { z } from "zod";

import {
  intakeDraftSchema,
  legalAreas,
  noticeVersion,
  type IntakeDraft,
  type LegalArea
} from "@/lib/chat/contracts";
import { chatPost } from "@/lib/chat/request";

const previewResult = z.strictObject({ receipt: z.string(), draft: intakeDraftSchema });
const submitResult = z.strictObject({
  message: z.string(),
  whatsappUrl: z.url({ protocol: /^https$/, hostname: /^wa\.me$/ }).optional()
});

export function IntakeForm({
  channels,
  initialArea,
  onBack
}: {
  channels: IntakeDraft["channel"][];
  initialArea: LegalArea;
  onBack: () => void;
}) {
  const [draft, setDraft] = useState<IntakeDraft>({
    channel: channels[0],
    firstName: "",
    contact: "",
    legalArea: initialArea,
    summary: ""
  });
  const [preview, setPreview] = useState<z.infer<typeof previewResult> | null>(null);
  const [result, setResult] = useState<z.infer<typeof submitResult> | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy || (preview && !confirmed)) return;
    setBusy(true);
    setError("");
    try {
      if (!preview) {
        setPreview(
          previewResult.parse(
            await chatPost("/api/intakes", { action: "preview", draft })
          )
        );
      } else {
        setResult(
          submitResult.parse(
            await chatPost("/api/intakes", {
              action: "confirm",
              confirmation: { ...preview, confirmed: true, noticeVersion }
            })
          )
        );
        setDraft({ ...draft, firstName: "", contact: "", summary: "" });
        setPreview(null);
        setConfirmed(false);
      }
    } catch (failure) {
      setError(
        failure instanceof Error && failure.name === "Error"
          ? failure.message
          : "Não foi possível registrar a solicitação."
      );
    } finally {
      setBusy(false);
    }
  }

  const input =
    "mt-1 block w-full rounded-lg border-petrol/20 bg-white text-base focus:border-gold focus:ring-gold/40";
  const primary =
    "min-h-11 rounded-lg bg-petrol px-4 py-2 text-sm font-semibold text-white transition hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petrol disabled:opacity-50";
  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold">
        {preview ? "Confira seu pedido" : "Pedir atendimento"}
      </h3>
      {result ? (
        <div role="status" className="space-y-3">
          <p>{result.message}</p>
          {result.whatsappUrl && (
            <a
              href={result.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center underline"
            >
              Abrir WhatsApp
            </a>
          )}
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-3 text-sm">
          {preview ? (
            <>
              <dl className="space-y-2 rounded-lg border border-petrol/10 bg-ivory p-3">
                <div>
                  <dt className="font-semibold">Canal e contato</dt>
                  <dd>
                    {preview.draft.channel === "email" ? "E-mail" : "WhatsApp"} ·{" "}
                    {preview.draft.contact}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Nome e área</dt>
                  <dd>
                    {preview.draft.firstName} · {legalAreas[preview.draft.legalArea]}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Resumo</dt>
                  <dd className="whitespace-pre-line break-words">
                    {preview.draft.summary}
                  </dd>
                </div>
              </dl>
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(event) => setConfirmed(event.target.checked)}
                  className="mt-1"
                  required
                />
                <span>
                  Autorizo o escritório a guardar os dados acima e usá-los para responder
                  ao meu pedido de atendimento, conforme a{" "}
                  <Link
                    href="/politica-de-privacidade"
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    Política de privacidade (abre em outra aba)
                  </Link>
                  . Este envio não confirma contratação nem atendimento de urgência.
                </span>
              </label>
              <button
                type="button"
                disabled={busy}
                onClick={() => {
                  setPreview(null);
                  setConfirmed(false);
                  setError("");
                }}
                className="mr-3 min-h-11 underline"
              >
                Editar
              </button>
            </>
          ) : (
            <>
              <label className="block">
                Primeiro nome
                <input
                  required
                  maxLength={50}
                  autoComplete="given-name"
                  className={input}
                  value={draft.firstName}
                  onChange={(e) => setDraft({ ...draft, firstName: e.target.value })}
                />
              </label>
              <label className="block">
                Área jurídica
                <select
                  className={input}
                  value={draft.legalArea}
                  onChange={(e) =>
                    setDraft({ ...draft, legalArea: e.target.value as LegalArea })
                  }
                >
                  {Object.entries(legalAreas).map(([id, label]) => (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                Canal
                <select
                  className={input}
                  value={draft.channel}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      channel: e.target.value as IntakeDraft["channel"],
                      contact: ""
                    })
                  }
                >
                  {channels.map((channel) => (
                    <option key={channel} value={channel}>
                      {channel === "email" ? "E-mail" : "WhatsApp"}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                {draft.channel === "email" ? "Seu e-mail" : "Seu telefone com DDD"}
                <input
                  required
                  maxLength={150}
                  className={input}
                  type={draft.channel === "email" ? "email" : "tel"}
                  autoComplete={draft.channel === "email" ? "email" : "tel"}
                  value={draft.contact}
                  onChange={(e) => setDraft({ ...draft, contact: e.target.value })}
                />
              </label>
              <label className="block">
                Resumo para o escritório
                <textarea
                  required
                  minLength={12}
                  maxLength={700}
                  rows={3}
                  className={input}
                  value={draft.summary}
                  onChange={(e) => setDraft({ ...draft, summary: e.target.value })}
                />
              </label>
              <p>Descreva o assunto sem documentos nem dados de terceiros.</p>
            </>
          )}
          {error && (
            <p role="alert" className="text-red-900">
              {error}
            </p>
          )}
          <button
            type="submit"
            className={primary}
            disabled={busy || (preview !== null && !confirmed)}
          >
            {busy ? "Aguarde…" : preview ? "Confirmar solicitação" : "Revisar pedido"}
          </button>
        </form>
      )}
      <button
        type="button"
        disabled={busy}
        onClick={onBack}
        className="min-h-11 text-sm underline"
      >
        Voltar à conversa
      </button>
    </div>
  );
}
