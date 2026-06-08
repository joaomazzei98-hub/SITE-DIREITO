import { PracticeAreaPage } from "@/components/sections/practice-area-page";
import { practiceAreas } from "@/data/practice-areas";
import { createMetadata } from "@/lib/metadata";

const area = practiceAreas.find((item) => item.slug === "trabalhista")!;

export const metadata = createMetadata({
  title: area.title,
  description: area.seoDescription,
  path: "/trabalhista"
});

export default function TrabalhistaPage() {
  return <PracticeAreaPage area={area} />;
}
