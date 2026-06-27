import Link from "next/link";

import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import type { PracticeArea } from "@/types/navigation";

type PracticeAreaPageProps = {
  area: PracticeArea;
};

export function PracticeAreaPage({ area }: PracticeAreaPageProps) {
  return (
    <>
      <section className="bg-paper-grain py-20 sm:py-24">
        <Container>
          <FadeIn className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">
              Área de atuação
            </p>
            <h1 className="mt-5 font-serif text-5xl leading-tight text-petrol sm:text-6xl">
              {area.title}
            </h1>
            <p className="text-graphite/78 mt-6 max-w-3xl text-lg leading-8">
              {area.description}
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-ivory py-16 sm:py-20">
        <Container>
          {area.featured ? (
            <FadeIn className="mb-10 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Destaque do escritório
              </p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-petrol sm:text-4xl">
                Atuação imobiliária para decisões patrimoniais mais seguras.
              </h2>
              <p className="text-graphite/72 mt-4 text-sm leading-6 sm:text-base sm:leading-7">
                A orientação começa pela leitura dos documentos, passa pela identificação
                dos riscos e segue com uma estratégia adequada para contratos,
                regularização, posse, locação ou conflitos envolvendo imóveis.
              </p>
            </FadeIn>
          ) : null}

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {area.highlights.map((highlight) => (
              <FadeIn key={highlight.title}>
                <Link
                  href={`/${area.slug}/${highlight.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-petrol/10 bg-white/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-soft"
                >
                  <span className="mb-5 block h-1 w-10 rounded-full bg-gold" />
                  <h2 className="font-serif text-2xl text-petrol">{highlight.title}</h2>
                  <p className="mt-4 flex-1 text-sm leading-6 text-graphite/70">
                    {highlight.description}
                  </p>
                  <span className="mt-6 text-sm font-semibold text-petrol transition group-hover:text-gold">
                    Ver atividade
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection title={`Converse sobre ${area.title.toLowerCase()}`} />
    </>
  );
}
