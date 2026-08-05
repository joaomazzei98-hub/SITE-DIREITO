import { getPracticeActivity, practiceAreas } from "@/data/practice-areas";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Atividade jurídica — Fleming & Batista";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return practiceAreas.flatMap((area) =>
    area.highlights.map((activity) => ({
      areaSlug: area.slug,
      activitySlug: activity.slug
    }))
  );
}

type ActivityImageProps = {
  params: Promise<{ areaSlug: string; activitySlug: string }>;
};

export default async function ActivityOpengraphImage({ params }: ActivityImageProps) {
  const { areaSlug, activitySlug } = await params;
  const result = getPracticeActivity(areaSlug, activitySlug);

  return renderOgImage({
    eyebrow: result?.area.title ?? "Área de atuação",
    title: result?.activity.title ?? "Atividade jurídica"
  });
}
