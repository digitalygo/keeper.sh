import { createFileRoute } from "@tanstack/react-router";
import { AuthForm, type AuthScreenCopy } from "../../components/auth/auth-form";

export const Route = createFileRoute("/(auth)/register")({
  component: RouteComponent,
});

const copy: AuthScreenCopy = {
  heading: "Create your account",
  subtitle: "Get started with Keeper for free",
  oauthActionLabel: "Sign up",
  submitLabel: "Sign up",
  switchPrompt: "Already have an account?",
  switchCta: "Sign in",
  switchTo: "/login",
  action: "signUp",
};

function RouteComponent() {
  return <AuthForm copy={copy} />;
}
