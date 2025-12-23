import { Check, X } from "lucide-react";
import { Button } from "@base-ui/react/button";
import type { PlanConfig } from "@/config/plans";
import {
  button,
  pricingCard,
  pricingBadge,
  pricingPrice,
  pricingPeriod,
  pricingFeature,
  pricingFeatureIcon,
  pricingFeatureText,
} from "@/styles";
import { SectionTitle, TextBody } from "@/components/typography";

type Plan = Omit<PlanConfig, "monthlyPrice" | "yearlyPrice" | "monthlyProductId" | "yearlyProductId"> & {
  price: number;
  period: string;
};

interface PlanCardProps {
  plan: Plan;
  isCurrent: boolean;
  isCurrentInterval: boolean;
  isLoading: boolean;
  isSubscriptionLoading?: boolean;
  onUpgrade: () => void;
  onManage: () => void;
  onSwitchInterval: () => void;
  targetInterval: "monthly" | "yearly";
}

const FeatureIcon = ({ included }: { included: boolean }) => {
  const Icon = included ? Check : X;
  return <Icon className={pricingFeatureIcon({ included })} />;
};

const PlanCardButton = ({
  plan,
  isCurrent,
  isCurrentInterval,
  isLoading,
  isSubscriptionLoading,
  onUpgrade,
  onManage,
  onSwitchInterval,
  targetInterval,
}: PlanCardProps) => {
  if (isSubscriptionLoading) {
    return (
      <Button
        className={button({ variant: "secondary", skeleton: true })}
        disabled
      >
        Upgrade
      </Button>
    );
  }

  if (isCurrent && plan.id === "free") {
    return (
      <Button className={button({ variant: "secondary" })} disabled>
        Current Plan
      </Button>
    );
  }

  if (isCurrent && isCurrentInterval) {
    return (
      <Button className={button({ variant: "secondary" })} onClick={onManage}>
        Manage Subscription
      </Button>
    );
  }

  if (isCurrent && !isCurrentInterval) {
    const label =
      targetInterval === "yearly" ? "Switch to Yearly" : "Switch to Monthly";
    return (
      <Button
        className={button({ variant: "primary" })}
        onClick={onSwitchInterval}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : label}
      </Button>
    );
  }

  if (plan.id === "free") {
    return (
      <Button className={button({ variant: "secondary" })} onClick={onManage}>
        Downgrade
      </Button>
    );
  }

  return (
    <Button
      className={button({ variant: "primary" })}
      onClick={onUpgrade}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : `Upgrade to ${plan.name}`}
    </Button>
  );
};

export const PlanCard = ({
  plan,
  isCurrent,
  isCurrentInterval,
  isLoading,
  isSubscriptionLoading,
  onUpgrade,
  onManage,
  onSwitchInterval,
  targetInterval,
}: PlanCardProps) => {
  const showCurrentBadge =
    !isSubscriptionLoading && isCurrent && isCurrentInterval;

  return (
    <div
      className={pricingCard({
        current: showCurrentBadge,
        featured: plan.popular,
        muted: !plan.popular,
      })}
    >
      <div className="flex items-center justify-between mb-4">
        <SectionTitle as="h3">{plan.name}</SectionTitle>
        <div className="flex gap-1.5">
          {(isSubscriptionLoading || showCurrentBadge) && (
            <span
              className={pricingBadge({
                variant: "current",
                skeleton: isSubscriptionLoading,
              })}
            >
              Current
            </span>
          )}
          {plan.popular && (
            <span className={pricingBadge({ variant: "popular" })}>
              Popular
            </span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <span className={pricingPrice()}>${plan.price}</span>
        <span className={pricingPeriod()}>{plan.period}</span>
      </div>

      <TextBody className="mb-6">{plan.description}</TextBody>

      <ul className="flex flex-col gap-3 mb-6 flex-1">
        {plan.features.map((feature) => (
          <li key={feature.name} className={pricingFeature()}>
            <FeatureIcon included={feature.included} />
            <span className={pricingFeatureText({ included: feature.included })}>
              {feature.name}
            </span>
          </li>
        ))}
      </ul>

      <PlanCardButton
        plan={plan}
        isCurrent={isCurrent}
        isCurrentInterval={isCurrentInterval}
        isLoading={isLoading}
        isSubscriptionLoading={isSubscriptionLoading}
        onUpgrade={onUpgrade}
        onManage={onManage}
        onSwitchInterval={onSwitchInterval}
        targetInterval={targetInterval}
      />
    </div>
  );
};
