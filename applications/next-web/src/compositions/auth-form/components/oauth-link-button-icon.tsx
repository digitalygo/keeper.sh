import type { FC } from "react"
import Image from "next/image"

type OAuthLinkButtonIconProps = {
  src: string
  alt?: string
}

export const OAuthLinkButtonIcon: FC<OAuthLinkButtonIconProps> = ({ src, alt = "" }) => {
  return <Image alt={alt} width={17} height={17} src={src} />
}
