import { createFileRoute, Outlet } from "@tanstack/react-router";
import KeeperLogo from "../../assets/keeper.svg?react";
import { LinkButton } from "../../components/ui/button";

export const Route = createFileRoute("/(auth)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-6 py-12 gap-8">
      <LinkButton to="/" variant="ghost" size="compact">
        <KeeperLogo className="max-w-6" />
      </LinkButton>
      <div className="flex flex-col gap-2 w-full max-w-xs">
        <Outlet />
      </div>
    </div>
  );
}
