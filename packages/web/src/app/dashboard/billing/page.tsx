import { redirect } from "next/navigation";
import { BillingPageContent } from "./billing-page-content";
import { isCommercialMode } from "@/config/mode";

export default function BillingPage() {
  if (!isCommercialMode) {
    redirect("/dashboard");
  }

  return <BillingPageContent />;
}
