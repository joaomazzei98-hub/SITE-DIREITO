import { PracticeAreaPage } from "@/components/sections/practice-area-page";
import { practiceAreas } from "@/data/practice-areas";
import { createMetadata } from "@/lib/metadata";

const area = practiceAreas.find((item) => item.slug === "direito-imobiliario")!;

export const metadata = createMetadata({
  title: area.title,
  description: area.seoDescription,
  path: "/direito-imobiliario"
});

export default function DireitoImobiliarioPage() {
  return <PracticeAreaPage area={area} />;
}
