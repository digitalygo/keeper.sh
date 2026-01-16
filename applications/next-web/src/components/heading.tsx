import { cn } from "@/utils/cn"
import { Lora } from "next/font/google"
import type { FC, HTMLProps } from "react"

const headingFont = Lora()

export const Heading1: FC<HTMLProps<HTMLHeadingElement>> = ({ className, children, ...props }) => {
  return (
    <h1 {...props} className={cn(headingFont.className, "text-3xl tracking-tighter font-medium text-foreground", className)}>{children}</h1>
  )
}

export const Heading2: FC<HTMLProps<HTMLHeadingElement>> = ({ className, children, ...props }) => {
  return (
    <h2 {...props} className={cn(headingFont.className, "text-2xl tracking-tighter font-medium text-foreground", className)}>{children}</h2>
  )
}

export const Heading3: FC<HTMLProps<HTMLHeadingElement>> = ({ className, children, ...props }) => {
  return (
    <h3 {...props} className={cn(headingFont.className, "text-xl tracking-tighter font-medium text-foreground", className)}>{children}</h3>
  )
}

export const Heading4: FC<HTMLProps<HTMLHeadingElement>> = ({ className, children, ...props }) => {
  return (
    <h4 {...props} className={cn(headingFont.className, "text-lg tracking-tighter font-medium text-foreground", className)}>{children}</h4>
  )
}
