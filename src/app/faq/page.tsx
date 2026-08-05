import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { allFaqs } from "@/data/faq";
import { createMetadata } from "@/lib/metadata";
import { faqPageSchema } from "@/lib/seo";

export const metadata = createMetadata({
  title: "FAQ",
  description:
    "Perguntas frequentes sobre atendimento, contato por WhatsApp e áreas de atuação da Fleming & Batista.",
  path: "/faq"
});

export default function FaqPage() {
  return (
    <section className="bg-paper-grain py-20 sm:py-24">
      <JsonLd id="faq-schema" data={faqPageSchema(allFaqs)} />
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
          {allFaqs.map((item) => (
            <FadeIn key={item.question}>
              <article className="rounded-3xl border border-petrol/10 bg-white/75 p-6">
                <h2 className="font-serif text-2xl text-petrol">{item.question}</h2>
                <p className="text-graphite/72 mt-3 text-sm leading-6">{item.answer}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
