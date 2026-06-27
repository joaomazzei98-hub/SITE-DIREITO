import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { primaryPracticeArea } from "@/data/practice-areas";
import { createWhatsAppUrl } from "@/utils/whatsapp";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-paper-grain">
      <Container className="grid items-center gap-12 py-12 sm:py-14 lg:grid-cols-[1.05fr_0.95fr]">
        <FadeIn>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-gold">
            Direito Imobiliário em São Paulo - Zona Norte
          </p>
          <h1 className="max-w-4xl font-serif text-5xl leading-[0.98] text-petrol sm:text-6xl">
            Segurança jurídica para imóveis, contratos e decisões patrimoniais.
          </h1>
          <p className="text-graphite/78 mt-7 max-w-2xl text-lg leading-8">
            A Flemming & Batista tem foco em Direito Imobiliário, com orientação para
            regularização, compra, venda, locação, posse e conflitos envolvendo imóveis.
            As demais áreas dão suporte às necessidades civis, familiares,
            previdenciárias, trabalhistas e de cidadania.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={createWhatsAppUrl()} target="_blank" rel="noreferrer">
              Falar pelo WhatsApp
            </ButtonLink>
            <ButtonLink
              href="/direito-imobiliario"
              variant="ghost"
              className="border border-petrol/15 bg-white/70 shadow-none hover:bg-white"
            >
              Ver Direito Imobiliário
            </ButtonLink>
          </div>
        </FadeIn>

        <FadeIn className="lg:justify-self-end">
          <div className="relative rounded-[2rem] bg-petrol p-7 text-ivory shadow-soft">
            <div className="absolute -left-5 top-10 h-20 w-1 rounded-full bg-gold" />
            <p className="text-sm uppercase tracking-[0.26em] text-gold">
              Atividades em destaque
            </p>
            <h2 className="mt-6 font-serif text-3xl leading-tight">
              {primaryPracticeArea.title}
            </h2>
            <div className="divide-ivory/12 mt-6 divide-y">
              {primaryPracticeArea.highlights.slice(0, 4).map((activity) => (
                <Link
                  key={activity.slug}
                  href={`/${primaryPracticeArea.slug}/${activity.slug}`}
                  className="text-ivory/84 block py-4 text-sm font-semibold transition first:pt-0 last:pb-0 hover:text-gold"
                >
                  {activity.title}
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
