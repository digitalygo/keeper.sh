"use client";

import type { FC, PropsWithChildren } from "react";
import { createContext, useContext } from "react";
import useSWR from "swr";
import { userSchema, type User } from "@keeper.sh/data-schemas";
import { authClient } from "@/lib/auth-client";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  refresh: () => Promise<void>;
}

const fetchSession = async (): Promise<User | null> => {
  const { data } = await authClient.getSession();
  if (!data?.user) return null;
  return userSchema.assert(data.user);
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: user, isLoading, mutate } = useSWR("session", fetchSession);

  const refresh = async () => {
    await mutate();
  };

  return (
    <AuthContext.Provider value={{ user: user ?? null, isLoading, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
