import type { FC } from "react";
import { useRef, useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import { User } from "lucide-react";
import { AnimatePresence, motion, LayoutGroup } from "motion/react";
import type { CalendarAccount } from "../../types/api";
import { getAccountLabel } from "../../utils/accounts";
import { pageOverlayActiveAtom } from "../../state/page-overlay";
import { AccountsPreview } from "./accounts-preview";
import { AccountItem } from "./account-item";
import {
  NavigationMenuItemIcon,
  NavigationMenuItemLabel,
  NavigationMenuItemTrailing,
} from "../ui/navigation-menu";

type AccountsPopoverProps = {
  accounts: CalendarAccount[];
};

const TriggerContent: FC<{ accounts: CalendarAccount[] }> = ({ accounts }) => (
  <>
    <NavigationMenuItemIcon>
      <User className="text-foreground-muted" size={15} />
      <NavigationMenuItemLabel>Calendar Accounts</NavigationMenuItemLabel>
    </NavigationMenuItemIcon>
    <NavigationMenuItemTrailing>
      <AccountsPreview accounts={accounts} />
    </NavigationMenuItemTrailing>
  </>
);

const LAYOUT_TRANSITION = { duration: 0.25, ease: [0.4, 0, 0.2, 1] as const };

const AccountsPopover: FC<AccountsPopoverProps> = ({ accounts }) => {
  const containerRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setOpen] = useAtom(pageOverlayActiveAtom);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, [setOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onPointerDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) close();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen, close]);

  return (
    <li ref={containerRef} className="relative grid grid-cols-1 grid-rows-1 *:col-start-1 *:row-start-1">
      <LayoutGroup>
        {/* Real trigger — always in flow, sizes the grid cell */}
        <div className="z-10">
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(!isOpen)}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            className="w-full rounded-xl flex items-center justify-between p-3 hover:bg-background-hover cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >

              <TriggerContent accounts={accounts} />
          </button>
        </div>

        {/* Animated surface — contains the trigger clone that morphs into the popover */}
        <motion.div
          layout
          className={
            isOpen
              ? "absolute top-0 inset-x-0 z-20 border border-border-elevated bg-background-elevated shadow-lg rounded-2xl pointer-events-none outline-none"
              : "relative z-10 pointer-events-none"
          }
          style={{ borderRadius: "1rem" }}
          transition={{ layout: LAYOUT_TRANSITION }}
        >
          {/* Trigger clone — always rendered, morphs position via layout */}
          <motion.div
            layout
            className="rounded-xl flex items-center justify-between p-3"
            style={{ borderRadius: "0.75rem" }}
            transition={{ layout: LAYOUT_TRANSITION }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="open-label"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.12 }}
                >
                  <NavigationMenuItemIcon>
                    <User className="text-foreground-muted" size={15} />
                    <NavigationMenuItemLabel>Calendar Accounts</NavigationMenuItemLabel>
                  </NavigationMenuItemIcon>
                </motion.div>
              ) : (
                <motion.div
                  key="closed-trigger"
                  className="flex items-center justify-between w-full"
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.12 }}
                >
                  <TriggerContent accounts={accounts} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Account list — only when open */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="p-0.5 pt-0 pointer-events-auto"
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(8px)" }}
                transition={{ duration: 0.15, delay: 0.06 }}
              >
                {accounts.map((account) => (
                  <AccountItem
                    key={account.id}
                    className="rounded-xl"
                    href={`/dashboard/accounts/${account.id}`}
                    provider={account.provider}
                    name={getAccountLabel(account)}
                    email={account.email ?? ""}
                    calendarCount={account.calendarCount}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </li>
  );
};

export { AccountsPopover };
