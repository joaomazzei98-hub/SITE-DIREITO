import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { createMetadata } from "@/lib/metadata";

const faqs = [
  {
    question: "O primeiro contato pode ser feito pelo WhatsApp?",
    answer:
      "Sim. O WhatsApp é o canal principal de conversão do site e permite uma triagem inicial objetiva."
  },
  {
    question: "O escritório atende somente a Zona Norte de São Paulo?",
    answer:
      "A base local é São Paulo - Zona Norte, mas a possibilidade de atendimento depende da área jurídica e do caso concreto."
  },
  {
    question: "O envio de mensagem cria relação advogado-cliente?",
    answer:
      "Não automaticamente. A relação profissional depende de aceite, análise do caso e formalização adequada."
  }
];

export const metadata = createMetadata({
  title: "FAQ",
  description:
    "Perguntas frequentes sobre atendimento, contato por WhatsApp e áreas de atuação da Mazzei e Fleming Advocacia.",
  path: "/faq"
});

export default function FaqPage() {
  return (
    <section className="bg-paper-grain py-20 sm:py-24">
      <Container>
        <FadeIn className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">
            Perguntas frequentes
          </p>
          <h1 className="mt-5 font-serif text-5xl leading-tight text-petrol sm:text-6xl">
            Respostas iniciais para orientar o primeiro contato.
          </h1>
        </FadeIn>

        <div className="mt-12 grid gap-4">
          {faqs.map((item) => (
            <FadeIn key={item.question}>
              <article className="rounded-3xl border border-petrol/10 bg-white/75 p-6">
                <h2 className="font-serif text-2xl text-petrol">{item.question}</h2>
                <p className="mt-3 text-sm leading-6 text-graphite/72">{item.answer}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
