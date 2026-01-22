import type { FC, PropsWithChildren } from "react"
import { FlexColumnGroup } from "@/components/flex-column-group"

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="flex size-full items-center justify-center min-h-screen">
      <div className="w-full max-w-sm px-1.5">
        <FlexColumnGroup className="gap-2">
          {children}
        </FlexColumnGroup>
      </div>
    </main>
  )
}

export default AuthLayout
