import useSWR from "swr";
import { authClient } from "@/lib/auth-client";
import { isCommercialMode } from "@/config/mode";

interface SubscriptionState {
  plan: "free" | "pro";
  interval: "month" | "year" | "week" | "day" | null;
}

async function fetchCustomerState(): Promise<SubscriptionState> {
  if (!isCommercialMode) {
    return { plan: "pro", interval: null };
  }

  const { data } = await authClient.customer.state();

  const [activeSubscription] = data?.activeSubscriptions ?? [];

  if (!activeSubscription) {
    return { plan: "free", interval: null };
  }

  return {
    plan: "pro",
    interval: activeSubscription.recurringInterval,
  };
}

export function useSubscription() {
  return useSWR("customer-state", fetchCustomerState);
}
