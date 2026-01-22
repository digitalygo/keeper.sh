import type { FC, PropsWithChildren } from "react"

export const CalendarDay: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative overflow-hidden aspect-square bg-surface-subtle dark:bg-background p-1.5 flex flex-col">
      {children}
    </div>
  )
}
