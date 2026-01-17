"use client"

import type { FC, PropsWithChildren } from "react"
import { LinkButton } from "@/components/button"
import { useCalendarHoverSetter } from "./calendar-illustration-provider"

type CalendarIllustrationButtonProps = PropsWithChildren<{
  href: string
}>

export const CalendarIllustrationButton: FC<CalendarIllustrationButtonProps> = ({ href, children }) => {
  const setIsHovered = useCalendarHoverSetter()

  return (
    <LinkButton
      href={href}
      variant="primary"
      size="compact"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </LinkButton>
  )
}
