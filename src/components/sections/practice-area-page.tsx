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
            <p className="mt-6 max-w-3xl text-lg leading-8 text-graphite/78">
              {area.description}
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-ivory py-16 sm:py-20">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {area.highlights.map((highlight) => (
              <FadeIn key={highlight.title}>
                <div className="h-full rounded-3xl border border-petrol/10 bg-white/70 p-6">
                  <span className="mb-5 block h-1 w-10 rounded-full bg-gold" />
                  <h2 className="font-serif text-2xl text-petrol">{highlight.title}</h2>
                  <p className="mt-4 text-sm leading-6 text-graphite/70">
                    {highlight.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection title={`Converse sobre ${area.title.toLowerCase()}`} />
    </>
  );
}
