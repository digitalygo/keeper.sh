"use client"

import { EmailFormInput } from "./email-form-input"
import { EmailFormError } from "./email-form-error"
import type { FC } from "react"

export const EmailFormInputGroup: FC = () => {
  return (
    <div className="flex flex-col">
      <EmailFormError />
      <EmailFormInput />
    </div>
  )
}
