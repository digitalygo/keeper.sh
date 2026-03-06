"use client"

import type { FC, PropsWithChildren } from "react"
import { Variants, AnimatePresence } from "motion/react"
import * as m from "motion/react-m";
import { LoaderCircle } from "lucide-react"
import { Button } from "@/components/button"
import { formStateAtom, FormStateAtomValue } from "../atoms/form-state"
import { useAtomValue } from "jotai"

const submitTextVariants: Record<FormStateAtomValue, Variants[string]> = {
  idle: {
    opacity: 1,
    filter: 'none',
    y: 0,
    scale: 1
  },
  loading: {
    opacity: 0,
    filter: 'blur(0.125rem)',
    y: -2,
    scale: 0.75
  }
}

export const EmailFormSubmitButton: FC<PropsWithChildren> = ({ children }) => {
  const formState = useAtomValue(formStateAtom);

  return (
    <m.div className="grow">
      <Button disabled={formState === 'loading'} type="submit" className="relative w-full" variant="primary" size="normal">
        <m.span
          className="origin-top"
          variants={submitTextVariants}
          animate={formState}
          transition={{ duration: 0.16 }}
        >
          {children}
        </m.span>
        <AnimatePresence>
          {formState === 'loading' && (
            <m.span
              className="absolute inset-0 m-auto size-fit origin-bottom"
              initial={{ opacity: 0, filter: 'blur(0.125rem)', y: 2, scale: 0.25 }}
              animate={{ opacity: 1, filter: 'none', y: 0, scale: 1 }}
              exit={{ opacity: 0, filter: 'blur(0.125rem)', y: 2, scale: 0.25 }}
              transition={{ duration: 0.16 }}
            >
              <LoaderCircle className="animate-spin" size={17} />
            </m.span>
          )}
        </AnimatePresence>
      </Button>
    </m.div>
  )
}
