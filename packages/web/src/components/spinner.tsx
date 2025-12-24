import type { FC } from "react";
import { tv } from "tailwind-variants";

const spinner = tv({
  base: "animate-spin rounded-full border-2 border-current border-t-transparent",
  variants: {
    size: {
      sm: "size-3",
      md: "size-4",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

interface SpinnerProps {
  size?: "sm" | "md";
  className?: string;
}

export const Spinner: FC<SpinnerProps> = ({ size, className }) => (
  <span className={spinner({ size, className })} />
);
