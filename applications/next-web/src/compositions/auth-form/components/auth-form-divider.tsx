import type { FC, PropsWithChildren } from "react"
import { FlexRowGroup } from "@/components/flex-row-group"
import { Divider } from "@/components/divider"

export const AuthFormDivider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <FlexRowGroup>
      <Divider />
      <span className="text-xs px-2 text-foreground-subtle">{children}</span>
      <Divider />
    </FlexRowGroup>
  )
}
