"use client"

import type { FC, FormEvent } from "react"
import { FlexRowGroup } from "@/components/flex-row-group"
import { Button } from "@/components/button"
import { LinkButton } from "@/components/button"
import { ArrowLeft } from "lucide-react"

type CalendarProvider = "google" | "outlook" | "microsoft-365"

type CalendarPermissionsActionsProps = {
  provider: CalendarProvider
  backHref?: string
}

export const CalendarPermissionsActions: FC<CalendarPermissionsActionsProps> = ({
  provider,
  backHref = "/login"
}) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    // TODO: Handle form submission
    console.log({ provider })
  }

  return (
    <form onSubmit={handleSubmit} className="contents">
      <FlexRowGroup className="items-stretch">
        <LinkButton href={backHref} variant="border" size="normal" className="px-3.5 mr-2">
          <ArrowLeft size={17} />
        </LinkButton>
        <Button type="submit" className="w-full" variant="primary" size="normal">
          Connect
        </Button>
      </FlexRowGroup>
    </form>
  )
}
