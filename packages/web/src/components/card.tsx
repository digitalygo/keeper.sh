import type { FC, PropsWithChildren } from "react";
import { tv } from "tailwind-variants";

const card = tv({
  base: "border rounded-md",
  variants: {
    variant: {
      default: "border-zinc-200",
      danger: "border-red-300 bg-red-50",
    },
    padding: {
      none: "",
      sm: "p-3",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "none",
  },
});

interface CardProps {
  variant?: "default" | "danger";
  padding?: "none" | "sm";
  className?: string;
}

export const Card: FC<PropsWithChildren<CardProps>> = ({
  variant,
  padding,
  className,
  children,
}) => <div className={card({ variant, padding, className })}>{children}</div>;
