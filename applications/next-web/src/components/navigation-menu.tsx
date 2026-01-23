"use client";

import type { FC, PropsWithChildren, ReactNode, Ref } from "react";
import { useState, forwardRef } from "react";
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

const navigationItemClassName = "rounded-[0.875rem] flex items-center justify-between p-3 hover:bg-surface-muted w-full hover:cursor-pointer";

const NavigationItemBase: FC<PropsWithChildren> = ({ children }) => (
  <div className={navigationItemClassName}>
    {children}
  </div>
);

type NavigationItemLinkProps = {
  href?: string;
  onClick?: () => void;
  className?: string;
};

const NavigationItemLink = forwardRef<HTMLAnchorElement, PropsWithChildren<NavigationItemLinkProps>>(
  ({ href, onClick, className, children }, ref) => {
    if (!href) {
      return (
        <button onClick={onClick} className={cn(navigationItemClassName, className)}>
          {children}
        </button>
      );
    }

    return (
      <Link ref={ref} href={href} className={cn(navigationItemClassName, className)}>
        {children}
      </Link>
    );
  }
);

NavigationItemLink.displayName = 'NavigationItemLink';

type NavigationItemProps = {
  ref?: Ref<HTMLLIElement>
  href?: string;
  onClick?: () => void;
};

const NavigationItem: FC<PropsWithChildren<NavigationItemProps>> = ({ href, onClick, children, ref }) => {
  return (
    <li ref={ref}>
      <NavigationItemLink href={href} onClick={onClick}>
        {children}
      </NavigationItemLink>
    </li>
  );
};

const NavigationItemIcon: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex items-center gap-2">
    {children}
  </div>
);

const NavigationItemLabel: FC<PropsWithChildren> = ({ children }) => (
  <Copy className="text-foreground-muted">{children}</Copy>
);

const NavigationItemRightContent: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex items-center gap-2">
    {children}
    <ArrowRight className="text-foreground-muted" size={15} />
  </div>
);

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

export { NavigationMenu, NavigationItem, NavigationItemBase, NavigationItemLink, NavigationItemIcon, NavigationItemLabel, NavigationItemRightContent, NavigationDropdownItem, NavigationDropdownHeader };
