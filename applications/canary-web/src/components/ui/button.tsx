import { PropsWithChildren } from "react";
import { tv, VariantProps } from "tailwind-variants/lite";

const button = tv({
  base: "flex items-center gap-1 rounded-xl tracking-tighter border hover:cursor-pointer",
  variants: {
    size: {
      compact: "px-3 py-1.5 text-sm",
      standard: "px-4 py-2.5",
    },
    type: {
      highlight: "shadow-xs border-transparent bg-foreground text-background hover:bg-foreground-hover",
      border: "border-interactive-border shadow-xs bg-background hover:bg-background-hover",
      ghost: "border-transparent bg-background hover:bg-background-hover",
    },
  },
  defaultVariants: {
    size: "standard",
    type: "highlight",
  }
})

type ButtonOptions = PropsWithChildren<VariantProps<typeof button>>

export function Button({ children, ...options }: ButtonOptions) {
  return (
    <button className={button(options)}>{children}</button>
  )
}

export function ButtonText({ children }: PropsWithChildren) {
  return <span>{children}</span>
}

export function ButtonIcon({ children }: PropsWithChildren) {
  return <div className="*:[svg]:sizeA">{children}</div>
}
