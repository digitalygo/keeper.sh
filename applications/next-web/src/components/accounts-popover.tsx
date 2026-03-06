"use client";

import type { FC } from "react";
import { useRef, useEffect } from "react";
import { useAtom } from "jotai";
import { User } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { AccountsPreview, AccountItem } from "@/compositions/connected-accounts/connected-accounts";
import { NavigationItemIcon, NavigationItemLabel, NavigationItemRightContent, NavigationMenu } from "./navigation-menu";
import { cn } from "@/utils/cn";
import { pageOverlayActiveAtom } from "@/atoms/page-overlay";

export type Account = {
  id: string;
  href: string;
  icon: string;
  name: string;
  email: string;
  eventCount: number;
  status?: 'synced' | 'syncing' | 'error';
};

type AccountsPopoverProps = {
  accounts: Account[];
};

const AccountsPopoverTriggerContent: FC = () => {
  return (
    <>
      <NavigationItemIcon>
        <User className="text-foreground-muted" size={15} />
        <NavigationItemLabel>Calendar Accounts</NavigationItemLabel>
      </NavigationItemIcon>
      <NavigationItemRightContent>
        <AccountsPreview />
      </NavigationItemRightContent>
    </>
  );
};

const AccountsPopover: FC<AccountsPopoverProps> = ({ accounts }) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const dummyTriggerRef = useRef<HTMLDivElement>(null);
  const dummyPopoverHeightRef = useRef<number>(0);

  const [isOpen, setOpen] = useAtom(pageOverlayActiveAtom);

  const handleToggle = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    const { current: dummyTrigger } = dummyTriggerRef;
    if (!dummyTrigger) return;

    const observer = new ResizeObserver((events) => {
      for (const event of events) {
        const { height } = event.contentRect;
        dummyPopoverHeightRef.current = height;
      }
    });

    observer.observe(dummyTrigger);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      popoverRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setOpen]);

  return (
    <div className="relative grid grid-cols-1 grid-rows-1 *:col-start-1 *:row-start-1">
      <m.div className="relative">
        <AnimatePresence mode="wait">
          {isOpen && (
            <m.div
              ref={popoverRef}
              id="accounts-popover-content"
              role="dialog"
              aria-label="Calendar Accounts"
              aria-modal="false"
              tabIndex={-1}
              className={
                cn(
                  "flex flex-col items-stretch justify-start shadow-lg border border-border -m-px bg-surface-elevated rounded-[0.875rem] absolute top-0 inset-x-0 overflow-hidden z-20 pointer-events-none outline-none",
                )
              }
              transition={{ duration: 0.16, height: { duration: 0.16 * 2 } }}
              style={{ transform: `translateY(calc(-50% + ${dummyPopoverHeightRef.current / 2}px))` }}
              initial={{ height: dummyPopoverHeightRef.current }}
              animate={{ height: 'auto' }}
              exit={{
                height: dummyPopoverHeightRef.current,
                transition: { duration: 0.16, height: { duration: 0.16 * 2 }, opacity: { delay: 0.16 * 2 } },
                opacity: 0,
              }}
            >
              <div className="relative">
                <NavigationMenu>
                  <m.li
                    transition={{ duration: 0.16 }}
                    initial={{ opacity: 1, filter: 'none', height: 'auto' }}
                    animate={{ opacity: 0, filter: 'blur(4px)', height: 0, translateY: -dummyPopoverHeightRef.current }}
                    exit={{ opacity: 1, filter: 'none', height: 'auto', translateY: 0 }}
                  >
                    <div className="w-full rounded-[0.875rem] flex items-center justify-between p-3">
                      <AccountsPopoverTriggerContent />
                    </div>
                  </m.li>
                  <m.li
                    className="rounded-2xl p-0.5 pointer-events-auto"
                    transition={{ duration: 0.16 }}
                    initial={{ opacity: 0, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, filter: 'none' }}
                    exit={{ opacity: 0, filter: 'blur(8px)' }}
                  >
                    {accounts.map((account) => (
                      <AccountItem
                        key={account.id}
                        className="rounded-[0.6875rem]"
                        href={account.href}
                        icon={account.icon}
                        name={account.name}
                        email={account.email}
                        eventCount={account.eventCount}
                        status={account.status}
                      />
                    ))}
                  </m.li>
                </NavigationMenu>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
      <div className="z-10" ref={dummyTriggerRef}>
        <button
          ref={triggerRef}
          type="button"
          onClick={handleToggle}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls="accounts-popover-content"
          className="w-full rounded-[0.875rem] flex items-center justify-between p-3 hover:bg-surface-muted cursor-pointer transition-colors focus-visible:outline-2 outline-offset-1 outline-border-emphasis"
        >
          <AccountsPopoverTriggerContent />
        </button>
      </div>
    </div>
  );
};

export { AccountsPopover };
