import { atom } from "jotai";

export type AuthFormStatus = "idle" | "loading";

export const authFormStatusAtom = atom<AuthFormStatus>("idle");

type AuthFormError = {
  message: string;
  active: boolean;
} | null;

const authFormErrorBaseAtom = atom<AuthFormError>(null);

export const authFormErrorAtom = atom(
  (get) => get(authFormErrorBaseAtom),
  (_get, set, update: AuthFormError) => {
    set(authFormErrorBaseAtom, update);
  }
);

authFormErrorAtom.onMount = (set) => {
  return () => set(null);
};
