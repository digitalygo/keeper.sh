import { authClient } from "./auth-client";

async function authPost(url: string, body: Record<string, unknown> = {}): Promise<void> {
  const response = await fetch(url, {
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message ?? "Request failed");
  }
}

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

export const signOut = () => authPost("/api/auth/sign-out");

export const forgotPassword = async (email: string): Promise<void> => {
  const { error } = await authClient.requestPasswordReset({
    email,
    redirectTo: "/reset-password",
  });
  if (error) throw new Error(error.message ?? "Failed to send reset email");
};

export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  const { error } = await authClient.resetPassword({ newPassword, token });
  if (error) throw new Error(error.message ?? "Failed to reset password");
};

export const changePassword = (currentPassword: string, newPassword: string) =>
  authPost("/api/auth/change-password", { currentPassword, newPassword });

export const deleteAccount = (password: string) =>
  authPost("/api/auth/delete-user", { password });
