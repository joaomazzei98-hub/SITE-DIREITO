import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { createMetadata } from "@/lib/metadata";

const values = [
  {
    title: "Clareza",
    description:
      "Explicação objetiva dos riscos, documentos necessários e próximos passos para que cada decisão seja tomada com segurança."
  },
  {
    title: "Estratégia",
    description:
      "Atuação orientada ao caso concreto, com atenção especial a patrimônio, contratos, imóveis e relações familiares."
  },
  {
    title: "Cuidado",
    description:
      "Atendimento discreto, humano e responsável em temas que envolvem direitos, família, trabalho e planejamento de vida."
  }
];

export const metadata = createMetadata({
  title: "Sobre",
  description:
    "Conheça a Flemming & Batista, escritório em São Paulo - Zona Norte com atendimento jurídico estratégico e humano.",
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
            <p className="text-graphite/78 mt-6 max-w-3xl text-lg leading-8">
              A Flemming & Batista atua com foco em Direito Imobiliário e uma proposta
              contemporânea: unir rigor jurídico, discrição e acolhimento para orientar
              decisões relevantes com segurança.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-ivory py-16 sm:py-20">
        <Container className="grid gap-6 md:grid-cols-3">
          {values.map((item) => (
            <FadeIn key={item.title}>
              <div className="h-full rounded-3xl border border-petrol/10 bg-white/70 p-6">
                <h2 className="font-serif text-3xl text-petrol">{item.title}</h2>
                <p className="mt-4 text-sm leading-6 text-graphite/70">
                  {item.description}
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
