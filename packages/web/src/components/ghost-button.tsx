import type { FC, PropsWithChildren, ComponentProps } from "react";
import { Button } from "@base-ui/react/button";
import { tv } from "tailwind-variants";

const ghostButton = tv({
  base: "text-xs px-2 py-1 rounded-md cursor-pointer transition-colors",
  variants: {
    variant: {
      default: "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50",
      danger: "text-red-600 hover:text-red-700 hover:bg-zinc-50",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type ButtonProps = ComponentProps<typeof Button>;

interface GhostButtonProps extends Omit<ButtonProps, "className"> {
  variant?: "default" | "danger";
  className?: string;
}

export const GhostButton: FC<PropsWithChildren<GhostButtonProps>> = ({
  variant,
  className,
  children,
  ...props
}) => (
  <Button className={ghostButton({ variant, className })} {...props}>
    {children}
  </Button>
);
