import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Fleming & Batista — Advocacia em São Paulo";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Direito Imobiliário",
    title: "Segurança jurídica para imóveis, contratos e decisões patrimoniais."
  });
}
