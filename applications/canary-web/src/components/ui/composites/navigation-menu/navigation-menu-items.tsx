import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { use } from "react";
import { Link } from "@tanstack/react-router";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import Check from "lucide-react/dist/esm/icons/check";
import { cn } from "../../../../utils/cn";
import {
  InsidePopoverContext,
  ItemDisabledContext,
  ItemIsLinkContext,
  MenuVariantContext,
} from "./navigation-menu.contexts";
import {
  DISABLED_LABEL_TONE,
  LABEL_TONE,
  navigationMenuCheckbox,
  navigationMenuCheckboxIcon,
  navigationMenuItemIconStyle,
  navigationMenuItemStyle,
  navigationMenuStyle,
  navigationMenuToggleThumb,
  navigationMenuToggleTrack,
  type MenuVariant,
} from "./navigation-menu.styles";
import { Text } from "../../primitives/text";

type NavigationMenuProps = PropsWithChildren<{
  variant?: MenuVariant;
  className?: string;
}>;

export function NavigationMenu({
  children,
  variant,
  className,
}: NavigationMenuProps) {
  return (
    <MenuVariantContext value={variant ?? "default"}>
      <ul className={navigationMenuStyle({ variant, className })}>{children}</ul>
    </MenuVariantContext>
  );
}

type NavigationMenuItemProps = PropsWithChildren<{
  className?: string;
}>;

type NavigationMenuLinkItemProps = PropsWithChildren<{
  to: ComponentPropsWithoutRef<typeof Link>["to"];
  onMouseEnter?: () => void;
  className?: string;
}>;

type NavigationMenuButtonItemProps = PropsWithChildren<{
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}>;

type NavigationMenuItemLabelProps = PropsWithChildren<{
  className?: string;
}>;

type NavigationMenuItemTrailingProps = PropsWithChildren<{
  className?: string;
}>;

export function NavigationMenuItem({
  className,
  children,
}: NavigationMenuItemProps) {
  const variant = use(MenuVariantContext);
  const insidePopover = use(InsidePopoverContext);
  const itemClass = navigationMenuItemStyle({ variant, interactive: false, className });
  const Wrapper = insidePopover ? "div" : "li";
  const content = <ItemIsLinkContext value={false}>{children}</ItemIsLinkContext>;

  return (
    <Wrapper>
      <div className={itemClass}>{content}</div>
    </Wrapper>
  );
}

export function NavigationMenuLinkItem({
  to,
  onMouseEnter,
  className,
  children,
}: NavigationMenuLinkItemProps) {
  const variant = use(MenuVariantContext);
  const insidePopover = use(InsidePopoverContext);
  const itemClass = navigationMenuItemStyle({ variant, interactive: true, className });
  const Wrapper = insidePopover ? "div" : "li";

  const content = <ItemIsLinkContext value={Boolean(to)}>{children}</ItemIsLinkContext>;

  return (
    <Wrapper>
      <Link
        draggable="false"
        to={to}
        className={itemClass}
        onMouseEnter={onMouseEnter}
      >
        {content}
      </Link>
    </Wrapper>
  );
}

export function NavigationMenuButtonItem({
  onClick,
  disabled,
  className,
  children,
}: NavigationMenuButtonItemProps) {
  const variant = use(MenuVariantContext);
  const insidePopover = use(InsidePopoverContext);
  const interactive = Boolean(onClick) && !disabled;
  const itemClass = navigationMenuItemStyle({ variant, interactive, className });
  const Wrapper = insidePopover ? "div" : "li";
  const content = <ItemIsLinkContext value={false}>{children}</ItemIsLinkContext>;

  return (
    <Wrapper>
      <ItemDisabledContext value={Boolean(disabled)}>
        <button type="button" onClick={onClick} disabled={disabled} className={itemClass}>
          {content}
        </button>
      </ItemDisabledContext>
    </Wrapper>
  );
}

export function NavigationMenuItemIcon({ children }: PropsWithChildren) {
  const variant = use(MenuVariantContext);
  const disabled = use(ItemDisabledContext);

  return <div className={navigationMenuItemIconStyle({ variant, disabled })}>{children}</div>;
}

export function NavigationMenuItemLabel({
  children,
  className,
}: NavigationMenuItemLabelProps) {
  const variant = use(MenuVariantContext);
  const disabled = use(ItemDisabledContext);
  const toneMap = disabled ? DISABLED_LABEL_TONE : LABEL_TONE;

  return (
    <Text
      size="sm"
      tone={toneMap[variant ?? "default"]}
      align="left"
      className={cn("min-w-0 truncate", className)}
    >
      {children}
    </Text>
  );
}

export function NavigationMenuEmptyItem({ children }: PropsWithChildren) {
  const variant = use(MenuVariantContext);

  return (
    <li>
      <div className={navigationMenuItemStyle({ variant, interactive: false })}>
        <Text
          size="sm"
          tone={LABEL_TONE[variant ?? "default"]}
          align="center"
          className="w-full"
        >
          {children}
        </Text>
      </div>
    </li>
  );
}

export function NavigationMenuItemTrailing({
  children,
  className,
}: NavigationMenuItemTrailingProps) {
  const isLink = use(ItemIsLinkContext);
  const variant = use(MenuVariantContext);

  return (
    <div className={cn("flex grow min-w-0 items-center gap-1 justify-end", className)}>
      {children}
      {isLink && (
        <ArrowRight
          className={cn("shrink-0", navigationMenuItemIconStyle({ variant }))}
          size={15}
        />
      )}
    </div>
  );
}

type NavigationMenuToggleableItemProps = PropsWithChildren<{
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}>;

export function NavigationMenuCheckboxItem({
  checked,
  onCheckedChange,
  className,
  children,
}: NavigationMenuToggleableItemProps) {
  const variant = use(MenuVariantContext);

  return (
    <li>
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={navigationMenuItemStyle({ variant, className })}
      >
        {children}
        <div className={navigationMenuCheckbox({ variant, checked, className: "ml-auto" })}>
          {checked && <Check size={12} className={navigationMenuCheckboxIcon({ variant })} />}
        </div>
      </button>
    </li>
  );
}

export function NavigationMenuToggleItem({
  checked,
  onCheckedChange,
  className,
  children,
}: NavigationMenuToggleableItemProps) {
  const variant = use(MenuVariantContext);

  return (
    <li>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={navigationMenuItemStyle({ variant, className })}
      >
        {children}
        <div className={navigationMenuToggleTrack({ variant, checked, className: "ml-auto" })}>
          <div className={navigationMenuToggleThumb({ variant, checked })} />
        </div>
      </button>
    </li>
  );
}
