import Link from "next/link";

import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { articlesByDate } from "@/data/articles";
import { createMetadata } from "@/lib/metadata";
import { formatArticleDate } from "@/lib/dates";

export const metadata = createMetadata({
  title: "Artigos",
  description:
    "Textos do escritório sobre Direito Imobiliário e demais áreas, escritos a partir de dúvidas frequentes de clientes.",
  path: "/artigos"
});

export default function ArtigosPage() {
  return (
    <>
      <section className="bg-paper-grain py-20 sm:py-24">
        <Container>
          <FadeIn className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">
              Artigos
            </p>
            <h1 className="mt-5 font-serif text-4xl leading-tight text-petrol sm:text-5xl lg:text-6xl">
              Orientação escrita a partir de dúvidas reais.
            </h1>
            <p className="text-graphite/78 mt-6 text-lg leading-8">
              Textos sobre situações que aparecem com frequência no atendimento, em
              linguagem direta e sem promessa de resultado.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {articlesByDate.map((article) => (
              <FadeIn key={article.slug}>
                <Link
                  href={`/artigos/${article.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-petrol/10 bg-white/75 p-6 transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-soft"
                >
                  <span className="mb-5 block h-1 w-10 rounded-full bg-gold" />
                  <h2 className="font-serif text-2xl leading-tight text-petrol">
                    {article.title}
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-6 text-graphite/70">
                    {article.description}
                  </p>
                  <span className="text-graphite/55 mt-6 text-xs uppercase tracking-[0.14em]">
                    {formatArticleDate(article.publishedAt)} ·{" "}
                    {article.readingMinutes} min de leitura
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
