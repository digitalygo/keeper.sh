import { cn } from "@/utils/cn"
import Link from "next/link"
import type { ComponentProps, FC } from "react"

export const InlineLink: FC<ComponentProps<typeof Link>> = ({ className, children, ...props }) => {
  return (
    <Link {...props} className={cn("inline underline text-link", className)}>{children}</Link>
  )
}
