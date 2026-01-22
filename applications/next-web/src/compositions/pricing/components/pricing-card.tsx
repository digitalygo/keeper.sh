import { Heading3 } from "@/components/heading"
import { MicroCopy } from "@/components/micro-copy"
import { Copy } from "@/components/copy"
import { LinkButton } from "@/components/button"
import { FlexColumnGroup } from "@/components/flex-column-group"
import { Lora } from "next/font/google"
import type { FC } from "react"
import type { PricingPlan } from "@/compositions/pricing/constants/plans"

const lora = Lora()

type PricingCardProps = {
  plan: PricingPlan
}

export const PricingCard: FC<PricingCardProps> = ({ plan }) => {
  return (
    <div className="border border-border rounded-2xl p-3 pt-5 flex flex-col">
      <FlexColumnGroup className="px-2">
        <FlexColumnGroup>
          <Heading3>{plan.name}</Heading3>
          <FlexColumnGroup className="gap-1">
            <div className="flex items-baseline gap-1">
              <span className={`${lora.className} text-3xl font-medium tracking-tighter text-foreground`}>{plan.price}</span>
              <MicroCopy className="text-foreground-subtle">per month</MicroCopy>
            </div>
            {plan.priceNote && <MicroCopy className="text-foreground-subtle">{plan.priceNote}</MicroCopy>}
          </FlexColumnGroup>
        </FlexColumnGroup>
        <Copy className="py-4">{plan.description}</Copy>
      </FlexColumnGroup>

      <LinkButton
        href={plan.buttonHref}
        variant={plan.highlighted ? "primary" : "border"}
        className="w-full justify-center mt-auto"
      >
        {plan.buttonText}
      </LinkButton>
    </div>
  )
}
