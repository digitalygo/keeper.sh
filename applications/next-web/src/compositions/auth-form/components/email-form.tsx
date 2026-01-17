"use client"

import type { FC, FormEvent } from "react"
import { useState } from "react"
import { LayoutGroup, motion } from "motion/react";
import { ArrowLeft, LoaderCircle } from "lucide-react"
import { AnimatePresence } from "motion/react"
import { Button, LinkButton } from "@/components/button"
import { Input } from "@/components/input"
import { FlexRowGroup } from "@/components/flex-row-group"

const backButtonVariants = {
  exit: {
    width: 0,
    opacity: 0,
    filter: 'blur(0.125rem)'
  }
}

const submitTextVariants = {
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

const loaderVariants = {
  idle: {
    opacity: 0,
    filter: 'blur(0.125rem)',
    y: 2,
    scale: 0.75
  },
  loading: {
    opacity: 1,
    filter: 'none',
    y: 0,
    scale: 1
  }
}

type EmailFormProps = {
  submitButtonText: string
}

export const EmailForm: FC<EmailFormProps> = ({ submitButtonText }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
  }
  return (
    <form onSubmit={handleSubmit} className="contents">
      <Input type="email" placeholder="johndoe+keeper@example.com" />
      <FlexRowGroup className="items-stretch">
        <LayoutGroup>
          <AnimatePresence>
            {!loading && (
              <motion.div
                className="flex flex-col items-end"
                variants={backButtonVariants}
                exit="exit"
                transition={{ width: { duration: 0.24 }, opacity: { duration: 0.12 } }}
              >
                <LinkButton href="/playground" className="h-full px-3.5 mr-2" variant="border">
                  <ArrowLeft size={17} />
                </LinkButton>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div className="grow">
            <Button disabled={loading} type="submit" className="relative w-full" variant="primary" size="normal">
              <motion.span
                className="origin-top"
                variants={submitTextVariants}
                animate={loading ? 'loading' : 'idle'}
                transition={{ duration: 0.16 }}
              >
                {submitButtonText}
              </motion.span>
              <motion.span
                className="absolute inset-0 m-auto size-fit origin-bottom"
                variants={loaderVariants}
                initial="idle"
                animate={loading ? 'loading' : 'idle'}
                transition={{ delay: 0.08, duration: 0.16 }}
              >
                <LoaderCircle className="animate-spin" size={17} />
              </motion.span>
            </Button>
          </motion.div>
        </LayoutGroup>
      </FlexRowGroup>
    </form>
  )
}
