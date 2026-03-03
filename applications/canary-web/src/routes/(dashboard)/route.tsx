import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { authClient } from "../../lib/auth-client";

export const Route = createFileRoute("/(dashboard)")({
  beforeLoad: async () => {
    const { data } = await authClient.getSession();
    if (!data?.session) throw redirect({ to: "/login" });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center min-h-dvh px-2 pb-12 pt-[min(6rem,25vh)]">
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <Outlet />
      </div>
    </div>
  );
}
