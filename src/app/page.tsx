import { CtaSection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { ProblemsSection } from "@/components/sections/problems-section";
import { PracticeAreasSection } from "@/components/sections/practice-areas-section";
import { TrustSection } from "@/components/sections/trust-section";
import { FloatingWhatsAppButton } from "@/components/ui/floating-whatsapp-button";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PracticeAreasSection />
      <ProblemsSection />
      <TrustSection />
      <HowItWorksSection />
      <FaqSection />
      <CtaSection />
      <FloatingWhatsAppButton />
    </>
  );
}
