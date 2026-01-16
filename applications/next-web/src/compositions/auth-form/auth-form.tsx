"use client"

import type { FC, FormEvent } from "react"
import { useState } from "react"
import { OAuthLinkButton } from "./components/oauth-link-button"
import { OrDivider } from "./components/or-divider"
import { EmailForm } from "./components/email-form"
import { FormFooter } from "./components/form-footer"

type AuthFormProps = {
  submitButtonText: string
  footerText: string
  footerLinkText: string
  footerLinkHref: string
}

export const AuthForm: FC<AuthFormProps> = ({
  submitButtonText,
  footerText,
  footerLinkText,
  footerLinkHref
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
  }

  return (
    <>
      <OAuthLinkButton provider="Google" icon="/integrations/icon-google.svg" href="/auth/google" />
      <OAuthLinkButton provider="Outlook" icon="/integrations/icon-outlook.svg" href="/auth/outlook" />
      <OrDivider />
      <EmailForm loading={loading} onSubmit={handleSubmit} submitButtonText={submitButtonText} />
      <FormFooter text={footerText} linkText={footerLinkText} linkHref={footerLinkHref} />
    </>
  )
}
