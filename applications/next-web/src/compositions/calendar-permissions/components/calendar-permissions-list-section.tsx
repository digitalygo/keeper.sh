import type { FC, PropsWithChildren } from "react"

export const CalendarPermissionsListSection: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col">
      {children}
    </div>
  )
}
