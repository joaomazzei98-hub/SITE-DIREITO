import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Sobre a Fleming & Batista";
export const size = ogSize;
export const contentType = ogContentType;

export default async function SobreOpengraphImage() {
  return renderOgImage({
    eyebrow: "Sobre o escritório",
    title: "Advocacia com técnica, presença e comunicação clara."
  });
}
