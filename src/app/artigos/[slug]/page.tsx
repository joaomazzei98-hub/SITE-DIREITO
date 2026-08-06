import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { articles, getArticle } from "@/data/articles";
import { getPracticeArea } from "@/data/practice-areas";
import { formatArticleDate } from "@/lib/dates";
import { createMetadata } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";

type ArticleRouteProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticleRouteProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return createMetadata({
      title: "Artigo não encontrado",
      description: "Artigo não encontrado."
    });
  }

  return createMetadata({
    title: article.title,
    description: article.description,
    path: `/artigos/${article.slug}`
  });
}

export default async function ArticlePage({ params }: ArticleRouteProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const { default: Content } = await import(`@/content/artigos/${slug}.mdx`);
  const area = getPracticeArea(article.areaSlug);

  return (
    <>
      <JsonLd id="article-schema" data={articleSchema(article)} />
      <JsonLd
        id="breadcrumb-schema"
        data={breadcrumbSchema([
          { name: "Início", path: "/" },
          { name: "Artigos", path: "/artigos" },
          { name: article.title, path: `/artigos/${article.slug}` }
        ])}
      />

      <section className="bg-paper-grain py-20 sm:py-24">
        <Container>
          <FadeIn className="max-w-3xl">
            <Link
              href="/artigos"
              className="inline-flex min-h-11 items-center text-sm font-semibold text-petrol underline decoration-gold/60 underline-offset-4 transition hover:text-gold"
            >
              Voltar para artigos
            </Link>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-petrol sm:text-5xl">
              {article.title}
            </h1>
            <p className="text-graphite/55 mt-6 text-xs uppercase tracking-[0.14em]">
              {formatArticleDate(article.publishedAt)} · {article.readingMinutes} min de
              leitura · {article.author}
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-ivory py-14 sm:py-16">
        <Container>
          <article className="max-w-3xl">
            <Content />

            {area ? (
              <p className="mt-12 border-t border-petrol/10 pt-8 text-sm leading-7 text-graphite/70">
                Este texto trata de um tema de{" "}
                <Link
                  href={`/${area.slug}`}
                  className="font-semibold text-petrol underline decoration-gold/60 underline-offset-4 transition hover:text-gold"
                >
                  {area.title}
                </Link>
                . Conteúdo informativo: a orientação depende da análise do caso concreto.
              </p>
            ) : null}
          </article>
        </Container>
      </section>

      <CtaSection title="Tem uma situação parecida?" />
    </>
  );
}
