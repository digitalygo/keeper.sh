import Image from "next/image";
import { FlexColumnGroup } from "@/components/flex-column-group";
import { FlexRowGroup } from "@/components/flex-row-group";
import type { FC } from "react";
import { Heading2 } from "@/components/heading";
import { Copy } from "@/components/copy";
import { MicroCopy } from "@/components/micro-copy";
import { Ellipsis } from "lucide-react";

type MarketingCalendarAppIconProps = {
  /**
   * Application name which is used to construct
   * the alt tag for the image
   */
  name: string;
  src: string;
}

const MarketingCalendarAppIcon: FC<MarketingCalendarAppIconProps> = ({ name, src }) => {
  return (
    <Image className="filter-[drop-shadow(0px_2px_2px_rgba(0,0,0,0.2))]" alt={`${name} app icon`} width={64} height={64} src={src} />
  )
}

export const MarketingConnectCalendars: FC = () => {
  return (
    <FlexColumnGroup className="gap-4 py-4">
      <Heading2 className="text-center">Connect all your accounts</Heading2>
      <FlexRowGroup className="mx-auto">
        <ul className="contents *:-ml-3.5">
          <li>
            <MarketingCalendarAppIcon name="Apple Calendar" src="/app-icons/app-apple-calendar.webp" />
          </li>
          <li>
            <MarketingCalendarAppIcon name="Google Calendar" src="/app-icons/app-google-calendar.webp" />
          </li>
          <li>
            <MarketingCalendarAppIcon name="Microsoft Outlook" src="/app-icons/app-microsoft-outlook.webp" />
          </li>
          <li>
            <MarketingCalendarAppIcon name="Fastmail" src="/app-icons/app-fastmail.webp" />
          </li>
        </ul>
      </FlexRowGroup>
      <Copy className="text-center">Whether it&apos;s a personal calendar, or a professional one — Keeper supports the most providers to meet your synchronization needs.</Copy>
    </FlexColumnGroup>
  )
}
