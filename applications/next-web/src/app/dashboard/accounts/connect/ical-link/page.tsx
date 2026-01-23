import type { FC } from "react";
import { Link } from "lucide-react";
import { Heading1 } from "@/components/heading";
import { ICSFeedConnectForm } from "@/compositions/ics-feed-connect/ics-feed-connect";
import { CalDAVConnectInstructions } from "@/compositions/caldav-connect/caldav-connect";
import { CalendarPermissionsCard } from "@/compositions/calendar-permissions/components/calendar-permissions-card";
import { CalendarPermissionsConnect } from "@/compositions/calendar-permissions/calendar-permissions-connect";
import { CalendarPermissionsHeader } from "@/compositions/calendar-permissions/components/calendar-permissions-header";
import { CalendarPermissionsContent } from "@/compositions/calendar-permissions/components/calendar-permissions-content";
import { CalendarPermissionsListSection } from "@/compositions/calendar-permissions/components/calendar-permissions-list-section";
import ICSFeedInstructions from "@/content/ics-feed-instructions/ical-link.mdx";

const SubscribeICSFeedPage: FC = () => {
  return (
    <CalendarPermissionsCard>
      <CalendarPermissionsConnect>
        <CalendarPermissionsHeader>
          <div className="size-14 rounded-xl border border-border shadow-xs bg-surface p-1 flex items-center justify-center">
            <Link size={32} className="text-foreground-muted" />
          </div>
          <CalendarPermissionsContent>
            <Heading1>Subscribe to ICS Calendar Feed</Heading1>
          </CalendarPermissionsContent>
        </CalendarPermissionsHeader>
        <CalendarPermissionsListSection>
          <CalDAVConnectInstructions>
            <ICSFeedInstructions />
          </CalDAVConnectInstructions>
          <ICSFeedConnectForm backHref="/dashboard/accounts/connect" />
        </CalendarPermissionsListSection>
      </CalendarPermissionsConnect>
    </CalendarPermissionsCard>
  );
};

export default SubscribeICSFeedPage;
