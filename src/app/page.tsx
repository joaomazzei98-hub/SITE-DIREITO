import { CtaSection } from "@/components/sections/cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PracticeAreasSection } from "@/components/sections/practice-areas-section";
import { TrustSection } from "@/components/sections/trust-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PracticeAreasSection />
      <TrustSection />
      <CtaSection />
    </>
  );
}
