import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Contato — Fleming & Batista";
export const size = ogSize;
export const contentType = ogContentType;

export default async function ContatoOpengraphImage() {
  return renderOgImage({
    eyebrow: "Contato",
    title: "Fale com a Fleming & Batista."
  });
}
