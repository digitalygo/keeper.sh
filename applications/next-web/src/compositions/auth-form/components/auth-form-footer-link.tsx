import type { FC, PropsWithChildren } from "react"
import { InlineLink } from "@/components/inline-link"

type AuthFormFooterLinkProps = PropsWithChildren<{
  href: string
}>

export const AuthFormFooterLink: FC<AuthFormFooterLinkProps> = ({ href, children }) => {
  return <InlineLink href={href}>{children}</InlineLink>
}
