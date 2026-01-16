import { tv } from "tailwind-variants"
import Link from "next/link"
import { cn } from "@/utils/cn"
import type { ButtonHTMLAttributes, ComponentProps, DetailedHTMLProps, FC } from "react"

const button = tv({
  base: `
    flex gap-1.5 items-center justify-center rounded-xl w-fit text-sm font-medium text-nowrap select-none
    tracking-tighter border border-transparent shadow-xs
    enabled:hover:cursor-pointer
    focus-visible:outline-2 outline-offset-1 outline-border-emphasis
    disabled:opacity-75 disabled:brightness-100 disabled:backdrop-brightness-unset disabled:cursor-not-allowed
  `,
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground hover:brightness-90 active:brightness-80 dark:hover:brightness-80 dark:active:brightness-70",
      secondary: "text-foreground backdrop-brightness-95 hover:backdrop-brightness-90 active:backdrop-brightness-85 dark:backdrop-brightness-105 dark:hover:backdrop-brightness-150 dark:active:backdrop-brightness-175 shadow-none",
      border: "border-border text-foreground hover:backdrop-brightness-95 active:backdrop-brightness-90 dark:hover:backdrop-brightness-150 dark:active:backdrop-brightness-175",
      ghost: "text-foreground hover:backdrop-brightness-95 active:backdrop-brightness-90 dark:hover:backdrop-brightness-150 dark:active:backdrop-brightness-175 shadow-none"
    },
    size: {
      normal: "text-md px-4 py-2.5",
      compact: "px-3 py-1.5"
    },
  },
  defaultVariants: {
    size: "normal",
    variant: "primary",
  }
})

type WithButtonProps<ComponentProperties> = ComponentProperties & {
  variant?: keyof typeof button["variants"]["variant"];
  size?: keyof typeof button["variants"]["size"];
}

export const Button: FC<WithButtonProps<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>>> = ({ className, variant, size, ...props }) => {
  return (
    <button {...props} className={cn(button({ variant, size }), className)}></button>
  )
}

export const LinkButton: FC<WithButtonProps<ComponentProps<typeof Link>>> = ({ className, variant, size, ...props }) => {
  return (
    <Link {...props} className={cn(button({ variant, size }), className)}></Link>
  )
}
