import type { FC, PropsWithChildren, ComponentProps } from "react";
import Link from "next/link";
import { tv } from "tailwind-variants";

const textLink = tv({
  base: "text-xs text-zinc-500 hover:text-zinc-900 transition-colors",
});

type LinkProps = ComponentProps<typeof Link>;

interface TextLinkProps extends Omit<LinkProps, "className"> {
  className?: string;
}

export const TextLink: FC<PropsWithChildren<TextLinkProps>> = ({
  className,
  children,
  ...props
}) => (
  <Link className={textLink({ className })} {...props}>
    {children}
  </Link>
);
