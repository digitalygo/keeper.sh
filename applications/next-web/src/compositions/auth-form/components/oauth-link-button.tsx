import type { FC, PropsWithChildren } from "react"
import { LinkButton } from "@/components/button"

type OAuthLinkButtonProps = PropsWithChildren<{
  href: string
}>

export const OAuthLinkButton: FC<OAuthLinkButtonProps> = ({ href, children }) => {
  return (
    <LinkButton href={href} className="w-full" variant="border">
      {children}
    </LinkButton>
  )
}
