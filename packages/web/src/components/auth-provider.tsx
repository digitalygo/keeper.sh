"use client";

import { createContext, useContext } from "react";
import useSWR from "swr";
import { authClient } from "@/lib/auth-client";

type Session = typeof authClient.$Infer.Session;
type User = Session["user"] & { username: string };

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  refresh: () => Promise<void>;
}

async function fetchSession(): Promise<User | null> {
  const { data } = await authClient.getSession();
  if (!data?.user) return null;
  return data.user as User;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading, mutate } = useSWR("session", fetchSession);

  const refresh = async () => {
    await mutate();
  };

  return (
    <AuthContext.Provider value={{ user: user ?? null, isLoading, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
