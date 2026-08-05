import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Política de Privacidade — Fleming & Batista";
export const size = ogSize;
export const contentType = ogContentType;

export default async function PrivacidadeOpengraphImage() {
  return renderOgImage({
    eyebrow: "Privacidade",
    title: "Política de Privacidade"
  });
}
