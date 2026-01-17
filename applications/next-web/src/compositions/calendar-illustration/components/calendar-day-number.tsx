import type { FC, PropsWithChildren } from "react"

export const CalendarDayNumber: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="text-[0.625rem] text-foreground-muted text-center font-semibold">
      {children}
    </div>
  )
}
