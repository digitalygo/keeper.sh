import { redirect } from "next/navigation";
import { MarketingPage } from "@/components/marketing/marketing-page";
import { PricingSection } from "@/components/marketing/pricing-section";
import { isCommercialMode } from "@/config/mode";

export default function PricingPage() {
  if (!isCommercialMode) {
    redirect("/dashboard");
  }

  return (
    <MarketingPage
      title="Pricing"
      description="Simple pricing for individuals and teams."
    >
      <PricingSection showHeading={false} />
    </MarketingPage>
  );
}
