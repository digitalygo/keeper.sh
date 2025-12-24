import useSWR from "swr";
import { authClient } from "@/lib/auth-client";

interface LinkedAccount {
  id: string;
  providerId: string;
  accountId: string;
}

const fetchLinkedAccounts = async (): Promise<LinkedAccount[]> => {
  const { data } = await authClient.listAccounts();
  if (!data) throw new Error("Failed to fetch linked accounts");
  return data;
};

export const useLinkedAccounts = () => {
  return useSWR("linked-accounts", fetchLinkedAccounts);
};
