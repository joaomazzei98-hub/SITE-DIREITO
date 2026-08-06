import { articles, getArticle } from "@/data/articles";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Artigo — Fleming & Batista";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

type ArticleImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArticleOpengraphImage({ params }: ArticleImageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  return renderOgImage({
    eyebrow: "Artigo",
    title: article?.title ?? "Artigos"
  });
}
