import Link from "next/link";

import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredPracticeAreas } from "@/data/practice-areas";

export function PracticeAreasSection() {
  return (
    <section id="areas" className="bg-ivory py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Áreas de atuação"
          title="Especialidades jurídicas organizadas para gerar confiança desde o primeiro contato."
          description="Conheça as principais frentes de atuação do escritório, com orientação clara, atendimento próximo e análise responsável para cada necessidade jurídica."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {featuredPracticeAreas.map((area) => (
            <FadeIn key={area.title}>
              <Link
                href={`/${area.slug}`}
                className="group flex h-full flex-col rounded-[1.6rem] border border-petrol/10 bg-white/60 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-soft"
              >
                <span className="mb-6 h-1 w-12 rounded-full bg-gold transition group-hover:w-16" />
                <h3 className="font-serif text-2xl text-petrol">{area.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-6 text-graphite/72">
                  {area.description}
                </p>
                <span className="mt-6 text-sm font-semibold text-petrol">
                  Saiba mais
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
