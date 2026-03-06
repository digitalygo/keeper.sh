"use client"

import { MicroCopy } from "@/components/micro-copy"
import { formErrorAtom } from "../atoms/form-state"
import { useAtomValue } from "jotai"
import * as m from "motion/react-m";
import type { FC } from "react"

export const EmailFormError: FC = () => {
  const error = useAtomValue(formErrorAtom)

  return (
    <m.div
      className="overflow-visible flex flex-col justify-end"
      initial={false}
      animate={{
        height: error?.isActive ? "auto" : 0,
        opacity: error?.isActive ? 1 : 0,
        filter: error?.isActive ? "blur(0px)" : "blur(4px)"
      }}
      transition={{ duration: 0.2 }}
    >
      <MicroCopy className="text-red-500 dark:text-red-400 text-left w-full">{error?.message}</MicroCopy>
    </m.div>
  )
}
