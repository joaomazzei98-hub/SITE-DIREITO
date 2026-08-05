import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { PracticeAreaPage } from "@/components/sections/practice-area-page";
import { getPracticeArea, practiceAreas } from "@/data/practice-areas";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/seo";

type AreaRouteProps = {
  params: Promise<{
    areaSlug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return practiceAreas.map((area) => ({ areaSlug: area.slug }));
}

export async function generateMetadata({ params }: AreaRouteProps) {
  const { areaSlug } = await params;
  const area = getPracticeArea(areaSlug);

  if (!area) {
    return createMetadata({
      title: "Área não encontrada",
      description: "Página de área de atuação não encontrada."
    });
  }

  return createMetadata({
    title: area.title,
    description: area.seoDescription,
    path: `/${area.slug}`
  });
}

export default async function AreaPage({ params }: AreaRouteProps) {
  const { areaSlug } = await params;
  const area = getPracticeArea(areaSlug);

  if (!area) {
    notFound();
  }

  return (
    <>
      <JsonLd
        id="breadcrumb-schema"
        data={breadcrumbSchema([
          { name: "Início", path: "/" },
          { name: area.title, path: `/${area.slug}` }
        ])}
      />
      <PracticeAreaPage area={area} />
    </>
  );
}
