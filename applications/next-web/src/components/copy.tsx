import { cn } from "@/utils/cn"
import type { FC, HTMLProps } from "react"

export const Copy: FC<HTMLProps<HTMLParagraphElement>> = ({ className, children, ...props }) => {
  return (
    <p {...props} className={cn("tracking-tight leading-relaxed text-sm text-foreground-secondary", className)}>{children}</p>
  )
}
