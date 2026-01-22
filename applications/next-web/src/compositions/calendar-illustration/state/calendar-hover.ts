import { atom } from "jotai"

const calendarHoverBaseAtom = atom(false)

export const calendarHoverAtom = atom(
  (get) => get(calendarHoverBaseAtom),
  (get, set, update: boolean) => {
    set(calendarHoverBaseAtom, update)
  }
)

calendarHoverAtom.onMount = (setAtom) => {
  return () => {
    setAtom(false)
  }
}
