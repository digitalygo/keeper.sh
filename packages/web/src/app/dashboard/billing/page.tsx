"use client";

import { Separator } from "@base-ui-components/react/separator";
import { SubscriptionPlans } from "@/components/subscription-plans";
import { SectionHeader } from "@/components/section-header";
import { useSubscription } from "@/hooks/use-subscription";

function BillingHistory() {
  return (
    <section className="flex flex-col gap-3">
      <SectionHeader
        title="Billing History"
        description="View your past invoices and payment history"
      />
      <div className="text-sm text-gray-500 py-4 border border-gray-200 rounded-lg text-center">
        No billing history yet
      </div>
    </section>
  );
}

export default function BillingPage() {
  const { data: subscription, isLoading, mutate } = useSubscription();

  return (
    <div className="flex-1 flex flex-col gap-8">
      <SubscriptionPlans
        currentPlan={subscription?.plan}
        currentInterval={subscription?.interval}
        isSubscriptionLoading={isLoading}
        onSubscriptionChange={mutate}
      />
      <Separator className="bg-gray-200 h-px" />
      <BillingHistory />
    </div>
  );
}
