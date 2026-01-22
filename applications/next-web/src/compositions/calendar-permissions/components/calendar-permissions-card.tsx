import type { FC, PropsWithChildren } from "react"
import { FlexColumnGroup } from "@/components/flex-column-group"

export const CalendarPermissionsCard: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="p-2 border border-border rounded-3xl shadow-xs">
      <FlexColumnGroup className="border border-border rounded-2xl p-3 pt-8 shadow-xs">
        {children}
      </FlexColumnGroup>
    </div>
  )
}
