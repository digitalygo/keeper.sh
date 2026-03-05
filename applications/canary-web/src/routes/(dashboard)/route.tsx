import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { popoverOverlayAtom } from "../../state/popover-overlay";

const hasSessionCookie = (): boolean =>
  document.cookie.split("; ").some((cookie) => cookie.startsWith("keeper.has_session=1"));

export const Route = createFileRoute("/(dashboard)")({
  beforeLoad: () => {
    if (!hasSessionCookie()) throw redirect({ to: "/login" });
  },
  component: DashboardLayout,
});

function DashboardLayout() {
  const overlayActive = useAtomValue(popoverOverlayAtom);

  return (
    <div className="relative flex flex-col items-center min-h-dvh px-4 pb-12 pt-4 xs:pt-[min(6rem,25vh)]">
      <div className="relative flex flex-col gap-3 w-full max-w-sm">
        <AnimatePresence>
          {overlayActive && (
            <motion.div
              className="fixed inset-0 z-10 backdrop-blur-[2px] bg-black/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
        <Outlet />
      </div>
    </div>
  );
}
