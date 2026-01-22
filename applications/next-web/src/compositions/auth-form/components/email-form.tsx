"use client"

import type { FC, FormEvent } from "react"
import { LayoutGroup } from "motion/react"
import { FlexRowGroup } from "@/components/flex-row-group"
import { formStateAtom, formErrorAtom } from "../atoms/form-state"
import { useSetAtom } from "jotai"
import { EmailFormBackButton } from "./email-form-back-button"
import { EmailFormSubmitButton } from "./email-form-submit-button"
import { EmailFormInputGroup } from "./email-form-input-group"

type EmailFormProps = {
  submitButtonText: string
}

export const EmailForm: FC<EmailFormProps> = ({ submitButtonText }) => {
  const setFormState = useSetAtom(formStateAtom)
  const setFormError = useSetAtom(formErrorAtom)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setFormState("loading")

    setTimeout(() => {
      setFormState("idle")
      setFormError({ message: "Invalid email or password. Please try again.", isActive: true })
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="contents">
      <EmailFormInputGroup />
      <FlexRowGroup className="items-stretch">
        <LayoutGroup>
          <EmailFormBackButton />
          <EmailFormSubmitButton>{submitButtonText}</EmailFormSubmitButton>
        </LayoutGroup>
      </FlexRowGroup>
    </form>
  )
}
