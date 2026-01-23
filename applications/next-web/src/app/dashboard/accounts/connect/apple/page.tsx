import type { FC } from "react";
import { Heading1 } from "@/components/heading";
import { CalDAVConnectForm, CalDAVConnectInstructions } from "@/compositions/caldav-connect/caldav-connect";
import { CalendarPermissionsCard } from "@/compositions/calendar-permissions/components/calendar-permissions-card";
import { CalendarPermissionsConnect } from "@/compositions/calendar-permissions/calendar-permissions-connect";
import { CalendarPermissionsHeader } from "@/compositions/calendar-permissions/components/calendar-permissions-header";
import { CalendarPermissionsIconPair } from "@/compositions/calendar-permissions/components/calendar-permissions-icon-pair";
import { CalendarPermissionsContent } from "@/compositions/calendar-permissions/components/calendar-permissions-content";
import { CalendarPermissionsListSection } from "@/compositions/calendar-permissions/components/calendar-permissions-list-section";
import ICloudInstructions from "@/content/caldav-instructions/icloud.mdx";

const ConnectApplePage: FC = () => {
  return (
    <CalendarPermissionsCard>
      <CalendarPermissionsConnect>
        <CalendarPermissionsHeader>
          <CalendarPermissionsIconPair provider="icloud" />
          <CalendarPermissionsContent>
            <Heading1>Connect Apple Calendar</Heading1>
          </CalendarPermissionsContent>
        </CalendarPermissionsHeader>
        <CalendarPermissionsListSection>
          <CalDAVConnectInstructions>
            <ICloudInstructions />
          </CalDAVConnectInstructions>
          <CalDAVConnectForm provider="icloud" backHref="/dashboard/accounts/connect" />
        </CalendarPermissionsListSection>
      </CalendarPermissionsConnect>
    </CalendarPermissionsCard>
  );
};

export default ConnectApplePage;
