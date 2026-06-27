import { PracticeAreaPage } from "@/components/sections/practice-area-page";
import { practiceAreas } from "@/data/practice-areas";
import { createMetadata } from "@/lib/metadata";

const area = practiceAreas.find((item) => item.slug === "direito-civil")!;

export const metadata = createMetadata({
  title: area.title,
  description: area.seoDescription,
  path: "/direito-civil"
});

export default function DireitoCivilPage() {
  return <PracticeAreaPage area={area} />;
}
