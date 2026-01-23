import type { FC, HTMLProps } from "react"
import { Divider } from "@/components/divider"
import { cn } from "@/utils/cn"

export const CalendarPermissionsDivider: FC<HTMLProps<HTMLDivElement>> = ({ className, ...props }) => {
  return <Divider {...props} className={cn("mb-3 mt-0", className)} />
}
