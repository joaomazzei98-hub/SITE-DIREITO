import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { lawyers } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

function getInitials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return `${parts[0]?.[0] ?? ""}${parts[parts.length - 1]?.[0] ?? ""}`.toUpperCase();
}

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
    "Conheça a Fleming & Batista, escritório em São Paulo com atendimento jurídico estratégico e humano.",
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
            <h1 className="mt-5 font-serif text-4xl leading-tight text-petrol sm:text-5xl lg:text-6xl">
              Advocacia com técnica, presença e comunicação clara.
            </h1>
            <p className="text-graphite/78 mt-6 max-w-3xl text-lg leading-8">
              A Fleming & Batista atua com foco em Direito Imobiliário e uma proposta
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

      <section className="bg-paper-grain py-16 sm:py-20">
        <Container>
          <FadeIn className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">
              Equipe
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-petrol sm:text-4xl lg:text-5xl">
              Quem conduz o seu caso.
            </h2>
          </FadeIn>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {lawyers.map((lawyer) => (
              <FadeIn key={lawyer.name}>
                <article className="h-full rounded-3xl border border-petrol/10 bg-white/75 p-6">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 font-serif text-lg text-petrol"
                  >
                    {getInitials(lawyer.name)}
                  </span>
                  <h3 className="mt-5 font-serif text-2xl leading-tight text-petrol">
                    {lawyer.name}
                  </h3>
                  <p className="mt-2 text-sm font-semibold tracking-wide text-gold">
                    {lawyer.jobTitle}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
