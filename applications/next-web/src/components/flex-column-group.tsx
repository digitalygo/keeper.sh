import { cn } from "@/utils/cn"
import type { DetailedHTMLProps, FC, HTMLAttributes, PropsWithChildren } from "react"

export const FlexColumnGroup: FC<PropsWithChildren<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={cn("flex flex-col", className)}>
      {children}
    </div>
  )
}
