import type { FC } from "react"
import { EventMarker } from "./event-marker"

type EventMarkerGroupProps = {
  colors: string[]
}

export const EventMarkerGroup: FC<EventMarkerGroupProps> = ({ colors }) => {
  return (
    <div className="flex justify-center gap-0.5 mt-auto">
      {colors.map((color) => (
        <EventMarker key={color} color={color} />
      ))}
    </div>
  )
}
