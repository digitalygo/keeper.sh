import { cn } from "@/utils/cn"
import type { FC, HTMLProps } from "react"

export const MicroCopy: FC<HTMLProps<HTMLParagraphElement>> = ({ className, children, ...props }) => {
  return (
    <p {...props} className={cn("text-xs tracking-tight leading-relaxed text-foreground-secondary", className)}>{children}</p>
  )
}
