import type { FC, PropsWithChildren } from "react"
import { FlexColumnGroup } from "@/components/flex-column-group"

export const CalendarPermissionsContent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <FlexColumnGroup className="gap-2">
      {children}
    </FlexColumnGroup>
  )
}
