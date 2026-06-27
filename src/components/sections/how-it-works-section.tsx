import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    title: "Você entra em contato",
    description:
      "Envie uma mensagem pelo WhatsApp e conte, de forma simples, qual é a sua necessidade."
  },
  {
    title: "O caso é analisado com atenção",
    description:
      "As informações iniciais são avaliadas para entender contexto, documentos e pontos de risco."
  },
  {
    title: "Uma estratégia jurídica é definida",
    description:
      "Você recebe orientação sobre caminhos possíveis, prazos, providências e próximos passos."
  },
  {
    title: "Você recebe acompanhamento durante o processo",
    description:
      "A condução do caso acontece com comunicação clara e atualização sobre cada etapa relevante."
  }
];

export function HowItWorksSection() {
  return (
    <section className="bg-ivory py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Como funciona"
          title="Um atendimento organizado para que você saiba o que esperar."
          description="Do primeiro contato ao acompanhamento do caso, a proposta é oferecer direção jurídica com clareza e responsabilidade."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <FadeIn key={step.title}>
              <article className="h-full rounded-[1.6rem] border border-petrol/10 bg-white/70 p-6">
                <span className="font-serif text-4xl text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-serif text-2xl leading-tight text-petrol">
                  {step.title}
                </h3>
                <p className="text-graphite/72 mt-4 text-sm leading-6">
                  {step.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
