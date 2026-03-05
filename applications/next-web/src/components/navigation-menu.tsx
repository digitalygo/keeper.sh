"use client";

import type { FC, PropsWithChildren, ReactNode, Ref } from "react";
import { createContext, use, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Copy } from "@/components/copy";
import { cn } from "@/utils/cn";

type NavigationMenuProps = {
  className?: string;
};

const NavigationMenu: FC<PropsWithChildren<NavigationMenuProps>> = ({ children, className }) => {
  return (
    <div className={className}>
      <ul>{children}</ul>
    </div>
  );
};

const navigationItemClassName = "rounded-[0.875rem] flex items-center justify-between p-3 hover:bg-surface-muted w-full hover:cursor-pointer focus-visible:outline-2 outline-offset-1 outline-border-emphasis";

const NavigationItemBase: FC<PropsWithChildren> = ({ children }) => (
  <div className={navigationItemClassName}>
    {children}
  </div>
);

type NavigationItemLinkProps = {
  ref?: Ref<HTMLAnchorElement>;
  href?: string;
  onClick?: () => void;
  className?: string;
};

const NavigationItemLink: FC<PropsWithChildren<NavigationItemLinkProps>> = ({ href, onClick, className, children, ref }) => {
  if (href) {
    return (
      <Link ref={ref} href={href} className={cn(navigationItemClassName, className)}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={cn(navigationItemClassName, className)}>
        {children}
      </button>
    );
  }

  return (
    <div className={cn(navigationItemClassName, "hover:bg-transparent hover:cursor-default", className)}>
      {children}
    </div>
  );
};

const NavigationItemContext = createContext(false);

type NavigationItemProps = {
  ref?: Ref<HTMLLIElement>
  href?: string;
  onClick?: () => void;
  className?: string;
};

const NavigationItem: FC<PropsWithChildren<NavigationItemProps>> = ({ href, onClick, className, children, ref }) => {
  return (
    <NavigationItemContext.Provider value={!!href}>
      <li ref={ref}>
        <NavigationItemLink href={href} onClick={onClick} className={className}>
          {children}
        </NavigationItemLink>
      </li>
    </NavigationItemContext.Provider>
  );
};

const NavigationItemIcon: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex items-center gap-2">
    {children}
  </div>
);

type NavigationItemLabelProps = {
  className?: string;
};

const NavigationItemLabel: FC<PropsWithChildren<NavigationItemLabelProps>> = ({ children, className }) => (
  <Copy className={cn("text-foreground-muted", className)}>{children}</Copy>
);

const NavigationItemRightContent: FC<PropsWithChildren> = ({ children }) => {
  const isLink = use(NavigationItemContext);
  return (
    <div className="flex items-center gap-2">
      {children}
      {isLink && <ArrowRight className="text-foreground-muted shrink-0" size={15} />}
    </div>
  );
};

type NavigationDropdownItemProps = {
  header: ReactNode;
  rightContent?: ReactNode;
};

const NavigationDropdownItem: FC<PropsWithChildren<NavigationDropdownItemProps>> = ({ header, rightContent, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-[0.875rem] flex items-center justify-between p-3 hover:bg-surface-muted cursor-pointer"
      >
        {header}
        <div className="flex items-center gap-2">
          {rightContent}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="text-foreground-muted" size={15} />
          </motion.div>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

const NavigationDropdownHeader: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex items-center gap-2">
    {children}
  </div>
);

type NavigationPopoverItemProps = {
  trigger: ReactNode;
  expanded: boolean;
  onToggle: () => void;
};

const NavigationPopoverItem: FC<PropsWithChildren<NavigationPopoverItemProps>> = ({ trigger, expanded, onToggle, children }) => {
  return (
    <li className="relative grid grid-cols-1 grid-rows-1 *:row-start-1 *:col-start-1">
      <button
        type="button"
        onClick={onToggle}
        className={cn(navigationItemClassName, "relative z-10")}
      >
        {trigger}
      </button>
      <div className="absolute grid place-items-center inset-0 pointer-events-none z-20">
        <AnimatePresence>
          {expanded && (
            <motion.div
              className="w-full overflow-hidden pointer-events-auto absolute rounded-[0.875rem] bg-surface-elevated border border-border shadow-lg"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
};

export { NavigationMenu, NavigationItem, NavigationItemBase, NavigationItemLink, NavigationItemIcon, NavigationItemLabel, NavigationItemRightContent, NavigationDropdownItem, NavigationDropdownHeader, NavigationPopoverItem };
