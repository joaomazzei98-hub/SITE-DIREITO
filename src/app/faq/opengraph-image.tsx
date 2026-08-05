import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Perguntas frequentes — Fleming & Batista";
export const size = ogSize;
export const contentType = ogContentType;

export default async function FaqOpengraphImage() {
  return renderOgImage({
    eyebrow: "Perguntas frequentes",
    title: "Respostas iniciais para orientar o primeiro contato."
  });
}
