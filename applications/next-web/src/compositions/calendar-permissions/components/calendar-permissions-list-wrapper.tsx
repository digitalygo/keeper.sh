import type { FC, PropsWithChildren } from "react"

export const CalendarPermissionsListWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="px-2 py-4">
      {children}
    </div>
  )
}
