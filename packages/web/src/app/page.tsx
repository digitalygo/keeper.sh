import { redirect } from "next/navigation";
import { MarketingPage } from "@/components/marketing/marketing-page";
import { HeroSection } from "@/components/marketing/hero-section";
import { FeaturesSection } from "@/components/marketing/features-section";
import { PricingSection } from "@/components/marketing/pricing-section";

function isCommercialMode(): boolean {
  return process.env.NEXT_PUBLIC_COMMERCIAL_MODE === "true";
}

export default function HomePage() {
  if (!isCommercialMode()) {
    redirect("/dashboard");
  }

  return (
    <MarketingPage>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
    </MarketingPage>
  );
}
