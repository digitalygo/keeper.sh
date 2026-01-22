import { atom } from "jotai";

export type FormStateAtomValue = "idle" | "loading";

export const formStateAtom = atom<FormStateAtomValue>("idle")

type FormError = {
  message: string
  isActive: boolean
} | null

export const formErrorAtom = atom<FormError>(null)
