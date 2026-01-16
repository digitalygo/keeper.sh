import type { FC } from "react"
import { MicroCopy } from "@/components/micro-copy"
import { InlineLink } from "@/components/inline-link"

type FormFooterProps = {
  text: string
  linkText: string
  linkHref: string
}

export const FormFooter: FC<FormFooterProps> = ({ text, linkText, linkHref }) => {
  return (
    <MicroCopy className="text-center">
      <span>{text} </span>
      <InlineLink href={linkHref}>{linkText}</InlineLink>
    </MicroCopy>
  )
}
