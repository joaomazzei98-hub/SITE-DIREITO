import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Sobre",
  description:
    "Conheça a Mazzei e Fleming Advocacia, escritório em São Paulo - Zona Norte com atendimento jurídico estratégico e humano.",
  path: "/sobre"
});

export default function SobrePage() {
  return (
    <>
      <section className="bg-paper-grain py-20 sm:py-24">
        <Container>
          <FadeIn className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">
              Sobre o escritório
            </p>
            <h1 className="mt-5 font-serif text-5xl leading-tight text-petrol sm:text-6xl">
              Advocacia com técnica, presença e comunicação clara.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-graphite/78">
              A Mazzei e Fleming Advocacia nasce com uma proposta contemporânea:
              unir rigor jurídico, discrição e acolhimento para orientar decisões
              relevantes com segurança.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-ivory py-16 sm:py-20">
        <Container className="grid gap-6 md:grid-cols-3">
          {["Clareza", "Estratégia", "Cuidado"].map((item) => (
            <FadeIn key={item}>
              <div className="h-full rounded-3xl border border-petrol/10 bg-white/70 p-6">
                <h2 className="font-serif text-3xl text-petrol">{item}</h2>
                <p className="mt-4 text-sm leading-6 text-graphite/70">
                  Pilar inicial preparado para receber copy institucional definitiva,
                  histórico, credenciais e diferenciais do escritório.
                </p>
              </div>
            </FadeIn>
          ))}
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
