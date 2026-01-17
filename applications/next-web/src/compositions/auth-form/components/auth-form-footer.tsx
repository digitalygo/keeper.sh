import type { FC, PropsWithChildren } from "react"
import { MicroCopy } from "@/components/micro-copy"

export const AuthFormFooter: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MicroCopy className="text-center">
      {children}
    </MicroCopy>
  )
}
