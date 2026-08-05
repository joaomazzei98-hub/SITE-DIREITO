import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { practiceFaqs as faqs } from "@/data/faq";

export function FaqSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Perguntas frequentes"
          title="Dúvidas comuns antes do primeiro contato."
          description="Respostas iniciais para ajudar você a entender quando vale buscar orientação jurídica e quais informações podem ser importantes."
        />

        <div className="mt-12 grid gap-4">
          {faqs.map((item) => (
            <FadeIn key={item.question}>
              <details className="group rounded-[1.4rem] border border-petrol/10 bg-ivory p-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 font-serif text-xl leading-tight text-petrol marker:hidden sm:text-2xl">
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/55 font-sans text-base text-gold transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="text-graphite/72 mt-4 max-w-4xl text-sm leading-6 sm:text-base sm:leading-7">
                  {item.answer}
                </p>
              </details>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
