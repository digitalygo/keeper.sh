import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export interface SubscriptionState {
  plan: "free" | "pro";
  interval: "month" | "year" | null;
}

interface ActiveSubscription {
  recurringInterval?: "month" | "year" | null;
}

interface CustomerStateResponse {
  activeSubscriptions?: ActiveSubscription[] | null;
}

async function fetchSubscriptionState(): Promise<SubscriptionState> {
  const data = await fetcher<CustomerStateResponse>("/api/auth/customer/state");
  const [active] = data.activeSubscriptions ?? [];

  if (!active) return { plan: "free", interval: null };

  return {
    plan: "pro",
    interval: active.recurringInterval === "year" ? "year" : "month",
  };
}

export function useSubscription() {
  const { data, error, isLoading, mutate } = useSWR("customer-state", fetchSubscriptionState);
  return { data, error, isLoading, mutate };
}
