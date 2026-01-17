import { cn } from "@/utils/cn"
import type { DetailedHTMLProps, FC, InputHTMLAttributes } from "react"

export const Input: FC<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = ({ className, ...props }) => {
  return (
    <input {...props} className={cn("px-4 py-2.5 border-border rounded-xl border tracking-tight shadow-xs bg-surface text-foreground focus-visible:outline-2 outline-offset-1 outline-border-emphasis disabled:opacity-50 disabled:cursor-not-allowed", className)}></input>
  )
}
