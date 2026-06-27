import Link from "next/link";

import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import type { PracticeArea, PracticeHighlight } from "@/types/navigation";

type PracticeActivityPageProps = {
  area: PracticeArea;
  activity: PracticeHighlight;
};

export function PracticeActivityPage({ area, activity }: PracticeActivityPageProps) {
  const relatedActivities = area.highlights.filter((item) => item.slug !== activity.slug);

  return (
    <>
      <section className="bg-paper-grain py-20 sm:py-24">
        <Container>
          <FadeIn className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">
              {area.title}
            </p>
            <h1 className="mt-5 font-serif text-5xl leading-tight text-petrol sm:text-6xl">
              {activity.title}
            </h1>
            <p className="text-graphite/78 mt-6 max-w-3xl text-lg leading-8">
              {activity.description}
            </p>
            <Link
              href={`/${area.slug}`}
              className="mt-8 inline-flex text-sm font-semibold text-petrol underline decoration-gold/60 underline-offset-4 transition hover:text-gold"
            >
              Voltar para {area.title}
            </Link>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-ivory py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-start">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Como atuamos
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-petrol sm:text-4xl">
              Uma análise jurídica objetiva para entender documentos, riscos e próximos
              passos.
            </h2>
            <div className="mt-8 divide-y divide-petrol/10 rounded-[1.6rem] border border-petrol/10 bg-white/70">
              {activity.details.map((detail) => (
                <p key={detail} className="text-graphite/72 px-6 py-5 text-sm leading-6">
                  {detail}
                </p>
              ))}
            </div>
          </FadeIn>

          <FadeIn>
            <aside className="rounded-[1.6rem] border border-petrol/10 bg-white/70 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Na mesma área
              </p>
              <div className="mt-5 divide-y divide-petrol/10">
                {relatedActivities.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${area.slug}/${item.slug}`}
                    className="block py-4 text-sm font-semibold text-petrol transition first:pt-0 last:pb-0 hover:text-gold"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </aside>
          </FadeIn>
        </Container>
      </section>

      <CtaSection title={`Converse sobre ${activity.title.toLowerCase()}`} />
    </>
  );
}
