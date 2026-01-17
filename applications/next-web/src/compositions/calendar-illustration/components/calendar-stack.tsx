import type { FC, PropsWithChildren } from "react"

export const CalendarStack: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative grid grid-cols-1 grid-rows-1 *:row-start-1 *:col-start-1">
      {children}
    </div>
  )
}
