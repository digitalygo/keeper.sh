import { cn } from "@/utils/cn"
import type { DetailedHTMLProps, FC, HTMLAttributes, PropsWithChildren } from "react"

export const FlexRowGroup: FC<PropsWithChildren<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={cn("flex items-center", className)}>
      {children}
    </div>
  )
}
