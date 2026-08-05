import { getPracticeArea, practiceAreas } from "@/data/practice-areas";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Área de atuação — Fleming & Batista";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return practiceAreas.map((area) => ({ areaSlug: area.slug }));
}

type AreaImageProps = {
  params: Promise<{ areaSlug: string }>;
};

export default async function AreaOpengraphImage({ params }: AreaImageProps) {
  const { areaSlug } = await params;
  const area = getPracticeArea(areaSlug);

  return renderOgImage({
    eyebrow: "Área de atuação",
    title: area?.title ?? "Áreas de atuação"
  });
}
