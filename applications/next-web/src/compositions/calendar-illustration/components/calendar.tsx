import type { FC } from "react"
import { type SkewTuple } from "../utils/transforms"
import { type EventRecord } from "../utils/events"
import { AnimatedCard } from "./animated-card"
import { CalendarFrame } from "./calendar-frame"
import { CalendarGrid } from "./calendar-grid"

type CalendarProps = {
  skew: SkewTuple
  events: EventRecord
  className?: string
}

export const Calendar: FC<CalendarProps> = ({ skew, events, className }) => {
  return (
    <AnimatedCard skew={skew} className={className}>
      <CalendarFrame>
        <CalendarGrid events={events} />
      </CalendarFrame>
    </AnimatedCard>
  )
}
