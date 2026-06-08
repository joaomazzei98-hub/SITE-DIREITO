import { PracticeAreaPage } from "@/components/sections/practice-area-page";
import { practiceAreas } from "@/data/practice-areas";
import { createMetadata } from "@/lib/metadata";

const area = practiceAreas.find((item) => item.slug === "previdenciario")!;

export const metadata = createMetadata({
  title: area.title,
  description: area.seoDescription,
  path: "/previdenciario"
});

export default function PrevidenciarioPage() {
  return <PracticeAreaPage area={area} />;
}
