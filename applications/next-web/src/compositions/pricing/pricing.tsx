import { Heading2 } from "@/components/heading"
import { Copy } from "@/components/copy"
import { PricingCard } from "@/compositions/pricing/components/pricing-card"
import { PricingComparisonTable } from "@/compositions/pricing/components/pricing-comparison-table"
import { plans } from "@/compositions/pricing/constants/plans"
import type { FC } from "react"

export const Pricing: FC = () => {
  return (
    <section className="py-12 px-4 md:px-8 w-full">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col items-center text-center gap-2">
          <Heading2>Simple Pricing</Heading2>
          <Copy className="max-w-[48ch]">If you&apos;d like to use the managed version of Keeper, you can get premium features for a small fee - or use it free!</Copy>
        </div>

        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-2">
            {plans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>

          <div className="hidden md:grid md:grid-cols-[auto_repeat(2,1fr)] gap-2">
            <div />
            {plans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}

            <PricingComparisonTable />
          </div>
        </div>
      </div>
    </section>
  )
}
