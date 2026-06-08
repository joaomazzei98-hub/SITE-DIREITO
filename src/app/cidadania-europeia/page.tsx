import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { citizenshipServices } from "@/data/practice-areas";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Cidadania Europeia",
  description:
    "Assessoria jurídica para cidadania italiana e portuguesa, com análise documental e planejamento estratégico em São Paulo.",
  path: "/cidadania-europeia"
});

export default function CidadaniaEuropeiaPage() {
  return (
    <>
      <section className="bg-paper-grain py-20 sm:py-24">
        <Container>
          <FadeIn className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">
              Área de atuação
            </p>
            <h1 className="mt-5 font-serif text-5xl leading-tight text-petrol sm:text-6xl">
              Cidadania Europeia
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-graphite/78">
              Assessoria para cidadania italiana e portuguesa, com organização
              documental, análise de requisitos e condução estratégica do processo.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-ivory py-16 sm:py-20">
        <Container className="grid gap-5 md:grid-cols-2">
          {citizenshipServices.map((area) => (
            <FadeIn key={area.title}>
              <article className="h-full rounded-[1.6rem] border border-petrol/10 bg-white/70 p-6">
                <span className="mb-5 block h-1 w-10 rounded-full bg-gold" />
                <h2 className="font-serif text-3xl text-petrol">{area.title}</h2>
                <p className="mt-4 text-sm leading-6 text-graphite/72">
                  {area.description}
                </p>
                <ul className="mt-6 space-y-3 text-sm text-graphite/72">
                  {area.highlights.map((highlight) => (
                    <li key={highlight.title}>• {highlight.title}</li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          ))}
        </Container>
      </section>

      <CtaSection title="Planeje seu processo de cidadania com orientação jurídica" />
    </>
  );
}
