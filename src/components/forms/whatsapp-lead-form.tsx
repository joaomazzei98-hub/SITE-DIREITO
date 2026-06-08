"use client";

import { useState } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { createWhatsAppUrl } from "@/utils/whatsapp";

const subjects = [
  "Direito Imobiliário",
  "Previdenciário",
  "Trabalhista",
  "Cidadania Europeia",
  "Outro assunto"
];

export function WhatsAppLeadForm() {
  const [subject, setSubject] = useState(subjects[0]);

  const message = `Olá, encontrei o site da Mazzei e Fleming Advocacia e gostaria de atendimento sobre ${subject}.`;

  return (
    <div className="rounded-[2rem] border border-petrol/10 bg-white/70 p-6 shadow-sm">
      <label
        htmlFor="lead-subject"
        className="text-sm font-semibold uppercase tracking-[0.18em] text-gold"
      >
        Assunto principal
      </label>
      <select
        id="lead-subject"
        value={subject}
        onChange={(event) => setSubject(event.target.value)}
        className="mt-3 w-full rounded-2xl border-petrol/15 bg-ivory text-petrol focus:border-gold focus:ring-gold"
      >
        {subjects.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <p className="mt-4 text-sm leading-6 text-graphite/70">
        O botão abaixo abre uma conversa no WhatsApp com uma mensagem inicial
        pronta. Nenhum dado é armazenado por este site.
      </p>
      <ButtonLink
        href={createWhatsAppUrl(message)}
        target="_blank"
        rel="noreferrer"
        className="mt-6 w-full"
      >
        Abrir WhatsApp
      </ButtonLink>
    </div>
  );
}
