import { createFileRoute } from "@tanstack/react-router";
import { AuthOAuthPreamble } from "../../../components/auth/oauth-preamble";

export const Route = createFileRoute("/(oauth)/auth/outlook")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AuthOAuthPreamble provider="outlook" backHref="/login" />;
}
