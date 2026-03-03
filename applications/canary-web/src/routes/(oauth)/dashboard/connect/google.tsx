import { createFileRoute } from "@tanstack/react-router";
import { LinkOAuthPreamble } from "../../../../components/auth/oauth-preamble";

export const Route = createFileRoute("/(oauth)/dashboard/connect/google")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-xs self-center">
      <LinkOAuthPreamble provider="google" backHref="/dashboard/connect" />
    </div>
  );
}
