import Link from "next/link";

import { PracticeAreasCarousel } from "@/components/sections/practice-areas-carousel";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredPracticeAreas, primaryPracticeArea } from "@/data/practice-areas";

const secondaryPracticeAreas = featuredPracticeAreas.filter(
  (area) => area.slug !== primaryPracticeArea.slug
);

export function PracticeAreasSection() {
  return (
    <section id="areas" className="bg-ivory py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Áreas de atuação"
          title="Direito Imobiliário em primeiro plano, com suporte jurídico completo."
          description="O site passa a destacar imóveis, contratos, regularização e conflitos imobiliários como foco principal do escritório, mantendo atendimento nas demais áreas estratégicas."
        />

        <FadeIn>
          <article className="mt-12 rounded-[1.8rem] border border-gold/40 bg-white/75 p-6 shadow-soft sm:p-8 lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Área principal
              </p>
              <h3 className="mt-4 font-serif text-4xl leading-tight text-petrol">
                {primaryPracticeArea.title}
              </h3>
              <p className="text-graphite/72 mt-5 text-sm leading-6 sm:text-base sm:leading-7">
                {primaryPracticeArea.description}
              </p>
              <Link
                href={`/${primaryPracticeArea.slug}`}
                className="mt-7 inline-flex rounded-full bg-petrol px-5 py-3 text-sm font-semibold text-ivory transition hover:-translate-y-0.5 hover:bg-ink focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
              >
                Conhecer atuação imobiliária
              </Link>
            </div>

            <div className="mt-8 divide-y divide-petrol/10 lg:mt-0">
              {primaryPracticeArea.highlights.map((activity) => (
                <Link
                  key={activity.slug}
                  href={`/${primaryPracticeArea.slug}/${activity.slug}`}
                  className="block py-4 first:pt-0 last:pb-0"
                >
                  <span className="font-serif text-2xl leading-tight text-petrol transition hover:text-gold">
                    {activity.title}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-graphite/70">
                    {activity.description}
                  </span>
                </Link>
              ))}
            </div>
          </article>
        </FadeIn>

        <FadeIn>
          <PracticeAreasCarousel areas={secondaryPracticeAreas} />
        </FadeIn>
      </Container>
    </section>
  );
}
