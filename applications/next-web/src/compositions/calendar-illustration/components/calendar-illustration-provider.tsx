"use client"

import type { FC, PropsWithChildren, Dispatch, SetStateAction } from "react"
import { createContext, useContext, useState } from "react"

type CalendarHoverContextType = {
  isHovered: boolean
  setIsHovered: Dispatch<SetStateAction<boolean>>
}

const CalendarHoverContext = createContext<CalendarHoverContextType | undefined>(undefined)

export const useCalendarHoverState = (): boolean => {
  const context = useContext(CalendarHoverContext)
  if (!context) {
    throw new Error("useCalendarHoverState must be used within CalendarIllustrationProvider")
  }
  return context.isHovered
}

export const useCalendarHoverSetter = (): Dispatch<SetStateAction<boolean>> => {
  const context = useContext(CalendarHoverContext)
  if (!context) {
    throw new Error("useCalendarHoverSetter must be used within CalendarIllustrationProvider")
  }
  return context.setIsHovered
}

export const CalendarIllustrationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <CalendarHoverContext.Provider value={{ isHovered, setIsHovered }}>
      {children}
    </CalendarHoverContext.Provider>
  )
}
