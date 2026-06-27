import { notFound } from "next/navigation";

import { PracticeActivityPage } from "@/components/sections/practice-activity-page";
import { getPracticeActivity, practiceAreas } from "@/data/practice-areas";
import { createMetadata } from "@/lib/metadata";

type ActivityRouteProps = {
  params: Promise<{
    areaSlug: string;
    activitySlug: string;
  }>;
};

export function generateStaticParams() {
  return practiceAreas.flatMap((area) =>
    area.highlights.map((activity) => ({
      areaSlug: area.slug,
      activitySlug: activity.slug
    }))
  );
}

export async function generateMetadata({ params }: ActivityRouteProps) {
  const { areaSlug, activitySlug } = await params;
  const result = getPracticeActivity(areaSlug, activitySlug);

  if (!result) {
    return createMetadata({
      title: "Atividade não encontrada",
      description: "Página de atividade jurídica não encontrada."
    });
  }

  return createMetadata({
    title: `${result.activity.title} | ${result.area.title}`,
    description: result.activity.seoDescription,
    path: `/${result.area.slug}/${result.activity.slug}`
  });
}

export default async function ActivityPage({ params }: ActivityRouteProps) {
  const { areaSlug, activitySlug } = await params;
  const result = getPracticeActivity(areaSlug, activitySlug);

  if (!result) {
    notFound();
  }

  return <PracticeActivityPage area={result.area} activity={result.activity} />;
}
