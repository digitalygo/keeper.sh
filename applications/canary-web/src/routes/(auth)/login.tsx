import { createFileRoute } from "@tanstack/react-router";
import { AuthForm, type AuthScreenCopy } from "../../components/auth/auth-form";

export const Route = createFileRoute("/(auth)/login")({
  component: RouteComponent,
});

const copy: AuthScreenCopy = {
  heading: "Welcome back",
  subtitle: "Sign in to your Keeper account",
  oauthActionLabel: "Sign in",
  submitLabel: "Sign in",
  switchPrompt: "Don't have an account yet?",
  switchCta: "Register",
  switchTo: "/register",
  action: "signIn",
};

function RouteComponent() {

  return <AuthForm copy={copy} />;
}
