import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Artigos — Fleming & Batista";
export const size = ogSize;
export const contentType = ogContentType;

export default async function ArtigosOpengraphImage() {
  return renderOgImage({
    eyebrow: "Artigos",
    title: "Orientação escrita a partir de dúvidas reais."
  });
}
