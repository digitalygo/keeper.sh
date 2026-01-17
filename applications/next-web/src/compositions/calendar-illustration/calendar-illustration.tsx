import type { FC, PropsWithChildren } from "react"
import { CalendarIllustrationProvider } from "./components/calendar-illustration-provider"

export const CalendarIllustration: FC<PropsWithChildren> = ({ children }) => {
  return (
    <CalendarIllustrationProvider>
      {children}
    </CalendarIllustrationProvider>
  )
}
