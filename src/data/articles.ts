/**
 * Metadados dos artigos. O texto de cada um fica em
 * `src/content/artigos/<slug>.mdx`.
 *
 * Para publicar um artigo novo: criar o `.mdx` e acrescentar a entrada
 * aqui. Listagem, rota, sitemap, schema e imagem de compartilhamento saem
 * disso automaticamente.
 */
export type Article = {
  slug: string;
  title: string;
  description: string;
  /** ISO 8601, usado em datePublished e no sitemap. */
  publishedAt: string;
  updatedAt?: string;
  /** Deve corresponder a um `name` de `lawyers`, em src/data/site.ts. */
  author: string;
  /** Slug da área de atuação relacionada, para o link de contexto. */
  areaSlug: string;
  readingMinutes: number;
};

export const articles: Article[] = [
  {
    slug: "documentos-para-regularizar-um-imovel",
    title: "Documentos necessários para regularizar um imóvel",
    description:
      "Quais documentos reunir antes de iniciar a regularização de um imóvel, o que cada um comprova e onde costumam aparecer as pendências que travam a venda.",
    publishedAt: "2026-08-06",
    author: "Ivani Mazzei Batista",
    areaSlug: "direito-imobiliario",
    readingMinutes: 6
  },
  {
    slug: "o-que-verificar-antes-de-assinar-compra-e-venda",
    title: "O que verificar antes de assinar um contrato de compra e venda",
    description:
      "Os pontos que merecem leitura atenta em um contrato de compra e venda de imóvel: documentos das partes, situação do bem, pagamento, garantias e prazos.",
    publishedAt: "2026-08-06",
    author: "Ivani Mazzei Batista",
    areaSlug: "direito-imobiliario",
    readingMinutes: 7
  }
];

/** Mais recentes primeiro. */
export const articlesByDate = [...articles].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt)
);

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
