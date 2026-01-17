import type { FC } from "react"

type EventMarkerProps = {
  color: string
}

export const EventMarker: FC<EventMarkerProps> = ({ color }) => {
  return <div className="size-1.25 rounded-xl" style={{ backgroundColor: color }} />
}
