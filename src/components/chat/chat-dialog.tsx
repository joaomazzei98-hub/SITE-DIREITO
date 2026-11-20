"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { z } from "zod";

import {
  channelSchema,
  chatReplySchema,
  idleSessionMs,
  legalAreas,
  maxHistoryTurns,
  maxMessageLength,
  type ChatReply
} from "@/lib/chat/contracts";
import { chatPost } from "@/lib/chat/request";
import { IntakeForm } from "./intake-form";
import { ArrowRightIcon, AssistantIcon } from "./chat-icons";

const sessionResult = z.strictObject({
  demo: z.boolean(),
  channels: z.array(channelSchema).max(2)
});
const suggestions = Object.values(legalAreas);
type SessionResult = z.infer<typeof sessionResult>;

export default function ChatDialog({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const scrollArea = useRef<HTMLDivElement>(null);
  const active = useRef<AbortController | null>(null);
  const [session, setSession] = useState<SessionResult | null>(null);
  const [question, setQuestion] = useState("");
  const [turns, setTurns] = useState<{ question: string; answer: ChatReply }[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [handoff, setHandoff] = useState(false);
  const [activityAt, setActivityAt] = useState(0);

  useEffect(() => {
    const element = dialog.current;
    if (element && !element.open) element.showModal();
    heading.current?.focus();
    return () => active.current?.abort();
  }, []);

  useEffect(() => {
    if (!activityAt) return;
    const timeout = window.setTimeout(() => dialog.current?.close(), idleSessionMs);
    return () => window.clearTimeout(timeout);
  }, [activityAt]);

  useEffect(() => {
    if (turns.length && scrollArea.current) {
      scrollArea.current.scrollTop = scrollArea.current.scrollHeight;
    }
  }, [turns.length]);

  async function send(message?: string) {
    if (active.current || (message !== undefined && !message.trim())) return;
    const controller = new AbortController();
    active.current = controller;
    setBusy(true);
    setError("");
    try {
      if (message === undefined) {
        setSession(
          sessionResult.parse(await chatPost("/api/chat/session", {}, controller.signal))
        );
      } else {
        const history = turns.slice(-maxHistoryTurns).map((turn) => ({
          question: turn.question,
          response: turn.answer.response
        }));
        const answer = chatReplySchema.parse(
          await chatPost("/api/chat", { message, history }, controller.signal)
        );
        setTurns((current) => [...current, { question: message, answer }]);
        setQuestion("");
      }
      setActivityAt(Date.now());
    } catch (failure) {
      if (!controller.signal.aborted) {
        setError(
          failure instanceof Error && failure.name === "Error"
            ? failure.message
            : "Não foi possível conectar ao assistente."
        );
      }
    } finally {
      active.current = null;
      if (!controller.signal.aborted) setBusy(false);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void send(question.trim());
  }

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      aria-labelledby="chat-title"
      className="fixed inset-x-2 bottom-[calc(env(safe-area-inset-bottom)+0.5rem)] top-auto m-0 max-h-none w-[calc(100%-1rem)] max-w-none overflow-hidden rounded-xl border border-petrol/10 bg-white text-petrol shadow-[0_8px_48px_rgba(22,49,62,0.15)] backdrop:bg-transparent sm:bottom-6 sm:left-auto sm:right-6 sm:w-[25rem]"
    >
      <div className="flex h-[min(45rem,calc(100dvh_-_env(safe-area-inset-bottom)_-_1rem))] flex-col border-t-[3px] border-gold sm:h-[min(45rem,calc(100dvh-3rem))]">
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-petrol/10 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/15 text-petrol">
              <AssistantIcon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h2
                id="chat-title"
                ref={heading}
                tabIndex={-1}
                className="text-sm font-semibold"
              >
                Assistente virtual
              </h2>
              <p className="mt-0.5 text-xs text-petrol/60">Fleming &amp; Batista</p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Fechar"
            title="Fechar conversa"
            onClick={() => dialog.current?.close()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-petrol/60 transition hover:bg-petrol/5 hover:text-petrol focus-visible:outline focus-visible:outline-2 focus-visible:outline-petrol"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
              className="h-5 w-5"
            >
              <path d="M5 12h14" />
            </svg>
          </button>
        </header>
        <div
          ref={scrollArea}
          className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 py-6"
        >
          {session?.demo && (
            <p className="rounded-lg bg-petrol/5 px-3 py-2 text-xs leading-relaxed text-petrol/70">
              Demonstração local. Para atendimento, use o contato do escritório.
            </p>
          )}
          {!session && (
            <>
              <div className="flex items-center gap-2 text-xs font-medium text-petrol/60">
                <AssistantIcon className="h-5 w-5 text-petrol" />
                Assistente virtual
              </div>
              <div className="space-y-3 text-sm leading-6">
                <p className="font-medium text-petrol">Olá! Como podemos ajudar?</p>
                <p className="text-petrol/75">
                  Posso responder a dúvidas gerais e ajudar você a falar com a equipe do
                  escritório.
                </p>
              </div>
              <button
                type="button"
                onClick={() => void send()}
                disabled={busy}
                className="flex min-h-12 w-full items-center justify-between gap-3 rounded-lg border border-gold/60 px-4 py-3 text-left text-sm font-medium text-petrol transition hover:border-gold hover:bg-gold/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-petrol disabled:opacity-50"
              >
                Iniciar conversa
                <ArrowRightIcon className="h-4 w-4 shrink-0" />
              </button>
            </>
          )}
          {session && !handoff && (
            <div role="log" aria-label="Mensagens da conversa" className="space-y-4">
              {!turns.length && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-petrol/60">
                    <AssistantIcon className="h-5 w-5 text-petrol" />
                    Assistente virtual
                  </div>
                  <p className="text-sm leading-6 text-petrol/80">
                    Escolha um assunto ou escreva sua pergunta.
                  </p>
                  <div className="space-y-2">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        disabled={busy}
                        onClick={() => void send(suggestion)}
                        className="flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border border-petrol/20 px-3 py-2.5 text-left text-sm text-petrol/80 transition hover:border-gold hover:bg-gold/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-petrol disabled:opacity-50"
                      >
                        {suggestion}
                        <ArrowRightIcon className="h-4 w-4 shrink-0 text-petrol" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {turns.map(({ question, answer }, index) => (
                <div key={index} className="space-y-5 text-sm leading-6">
                  <p className="ml-8 break-words rounded-xl rounded-br-sm bg-gold/15 px-4 py-3 text-petrol">
                    <span className="sr-only">Você. </span>
                    {question}
                  </p>
                  <div className="mr-3 break-words">
                    <div
                      className="mb-2 flex items-center gap-2 text-xs font-medium text-petrol/60"
                      aria-hidden="true"
                    >
                      <AssistantIcon className="h-5 w-5 text-petrol" />
                      Assistente virtual
                    </div>
                    <p className="whitespace-pre-line">
                      <span className="sr-only">Assistente. </span>
                      {answer.response}
                    </p>
                    {answer.source_references.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {answer.source_references.map((source) => (
                          <li key={source.id}>
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-petrol underline"
                            >
                              {source.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                    {index === turns.length - 1 &&
                      answer.requires_human &&
                      answer.suggested_action === "atendimento" &&
                      (session.channels.length > 0 ? (
                        <button
                          type="button"
                          onClick={() => setHandoff(true)}
                          disabled={busy}
                          className="mt-4 inline-flex min-h-11 items-center gap-3 rounded-lg bg-petrol px-4 py-2 text-sm font-semibold text-white hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petrol disabled:opacity-50"
                        >
                          Atendimento humano
                          <ArrowRightIcon className="h-4 w-4" />
                        </button>
                      ) : (
                        <Link
                          href="/contato"
                          onClick={() => dialog.current?.close()}
                          className="mt-4 inline-flex min-h-11 items-center gap-3 rounded-lg bg-petrol px-4 py-2 text-sm font-semibold text-white hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petrol"
                        >
                          Atendimento humano
                          <ArrowRightIcon className="h-4 w-4" />
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {session && handoff && (
            <IntakeForm
              channels={session.channels}
              initialArea={turns.at(-1)?.answer.legal_area ?? "imobiliario"}
              onBack={() => setHandoff(false)}
            />
          )}
          {busy && (
            <p role="status" className="text-sm text-petrol/60">
              Aguarde um momento…
            </p>
          )}
          {error && (
            <div role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-900">
              <p>{error}</p>
              <Link
                href="/contato"
                onClick={() => dialog.current?.close()}
                className="mt-2 inline-flex min-h-11 items-center font-semibold underline"
              >
                Atendimento humano
              </Link>
            </div>
          )}
        </div>
        <div className="shrink-0 space-y-2 border-t border-petrol/10 bg-white px-4 pb-3 pt-3">
          {session && !handoff && (
            <form
              onSubmit={submit}
              className="flex items-end gap-2 rounded-lg border border-petrol/20 bg-ivory p-1.5 focus-within:border-gold focus-within:ring-1 focus-within:ring-gold/40"
            >
              <label className="min-w-0 flex-1">
                <span className="sr-only">Sua pergunta</span>
                <textarea
                  rows={1}
                  placeholder="Escreva sua pergunta…"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  maxLength={maxMessageLength}
                  className="block max-h-28 min-h-11 w-full resize-y border-0 bg-transparent px-2 py-3 text-base placeholder:text-petrol/45 focus:ring-0"
                />
              </label>
              <button
                type="submit"
                aria-label="Enviar"
                disabled={busy || !question.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-petrol text-white transition hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petrol disabled:opacity-40"
              >
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </form>
          )}
          <div className="flex flex-wrap items-center justify-between gap-x-3 text-xs">
            <Link
              href="/politica-de-privacidade"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center text-petrol/70 underline hover:text-petrol"
            >
              Política de privacidade
              <span className="sr-only"> (abre em outra aba)</span>
            </Link>
            <Link
              href="/contato"
              onClick={() => dialog.current?.close()}
              className="inline-flex min-h-11 items-center text-petrol/70 underline hover:text-petrol"
            >
              Contato do escritório
            </Link>
            {session && !handoff && session.channels.length > 0 && (
              <button
                type="button"
                onClick={() => setHandoff(true)}
                disabled={busy}
                className="min-h-11 font-medium text-petrol underline disabled:opacity-50"
              >
                Pedir atendimento
              </button>
            )}
          </div>
          {!session && (
            <p className="pb-1 text-xs leading-relaxed text-petrol/65">
              Este é um assistente automatizado de informações gerais. Não envie nomes
              completos, números ou cópias de documentos, senhas, dados médicos ou de
              terceiros. Quando a IA está ativada, a pergunta e até quatro trocas recentes
              são processadas pela OpenAI. Este chat não monitora urgências.
            </p>
          )}
        </div>
      </div>
    </dialog>
  );
}
