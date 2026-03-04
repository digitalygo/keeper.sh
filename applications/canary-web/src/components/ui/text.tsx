import type { CSSProperties, PropsWithChildren } from "react";
import { tv } from "tailwind-variants/lite";

const text = tv({
  base: "tracking-tight",
  variants: {
    size: {
      base: "text-base",
      sm: "text-sm",
      xs: "text-xs",
    },
    tone: {
      muted: "text-foreground-muted",
      inverse: "text-foreground-inverse",
      inverseMuted: "text-foreground-inverse-muted",
      default: "text-foreground",
      danger: "text-red-500",
    },
    align: {
      center: "text-center",
      left: "text-left",
    },
  },
  defaultVariants: {
    size: "base",
    tone: "muted",
    align: "left",
  },
});

type TextProps = PropsWithChildren<{
  size?: "base" | "sm" | "xs";
  tone?: "muted" | "inverse" | "inverseMuted" | "default" | "danger";
  align?: "center" | "left";
  className?: string;
  style?: CSSProperties;
}>;

export function Text({ children, size, tone, align, className, style }: TextProps) {
  return <p className={text({ size, tone, align, className })} style={style}>{children}</p>;
}
