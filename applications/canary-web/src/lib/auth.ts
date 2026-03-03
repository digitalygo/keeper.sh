import { authClient } from "./auth-client";

export const signInWithEmail = async (email: string, password: string): Promise<void> => {
  const { error } = await authClient.signIn.email({ email, password });
  if (error) throw new Error(error.message ?? "Sign in failed");
};

export const signUpWithEmail = async (email: string, password: string): Promise<void> => {
  const { error } = await authClient.signUp.email({
    callbackURL: "/dashboard",
    email,
    name: email.split("@")[0] ?? email,
    password,
  });
  if (!error) return;
  if (error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
    throw new Error("This email is already registered. Please sign in instead.");
  }
  throw new Error(error.message ?? "Sign up failed");
};

export const signInWithGoogle = async (): Promise<void> => {
  await authClient.signIn.social({ callbackURL: "/dashboard", provider: "google" });
};

export const signOut = async (): Promise<void> => {
  const response = await fetch("/api/auth/sign-out", {
    body: JSON.stringify({}),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
  if (!response.ok) throw new Error("Sign out failed");
};

export const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
  const response = await fetch("/api/auth/change-password", {
    body: JSON.stringify({ currentPassword, newPassword }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "Failed to change password");
  }
};

export const deleteAccount = async (password: string): Promise<void> => {
  const response = await fetch("/api/auth/delete-user", {
    body: JSON.stringify({ password }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "Failed to delete account");
  }
};
