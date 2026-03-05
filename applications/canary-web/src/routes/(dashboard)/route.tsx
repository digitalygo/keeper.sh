import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

const hasSessionCookie = (): boolean =>
  document.cookie.split("; ").some((cookie) => cookie.startsWith("keeper.has_session=1"));

export const Route = createFileRoute("/(dashboard)")({
  beforeLoad: () => {
    if (!hasSessionCookie()) throw redirect({ to: "/login" });
  },
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div className="flex flex-col items-center min-h-dvh px-4 pb-12 pt-4 xs:pt-[min(6rem,25vh)]">
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <Outlet />
      </div>
    </div>
  );
}
