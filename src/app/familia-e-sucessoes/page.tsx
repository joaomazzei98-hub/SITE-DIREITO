import { PracticeAreaPage } from "@/components/sections/practice-area-page";
import { practiceAreas } from "@/data/practice-areas";
import { createMetadata } from "@/lib/metadata";

const area = practiceAreas.find((item) => item.slug === "familia-e-sucessoes")!;

export const metadata = createMetadata({
  title: area.title,
  description: area.seoDescription,
  path: "/familia-e-sucessoes"
});

export default function FamiliaESucessoesPage() {
  return <PracticeAreaPage area={area} />;
}
