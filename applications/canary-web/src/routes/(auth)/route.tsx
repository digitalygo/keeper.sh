import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { hasSessionCookie } from "../../lib/session-cookie";

export const Route = createFileRoute("/(auth)")({
  beforeLoad: () => {
    if (hasSessionCookie()) throw redirect({ to: "/dashboard" });
  },
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-2">
      <div className="flex flex-col gap-2 w-full max-w-xs">
        <Outlet />
      </div>
    </div>
  );
}
