import type { FC, PropsWithChildren } from "react"
import { Copy } from "@/components/copy"

export const AuthFormFooter: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Copy className="text-center">
      {children}
    </Copy>
  )
}
