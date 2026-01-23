import type { FC } from "react";
import { Heading1 } from "@/components/heading";
import { CalDAVConnectForm, CalDAVConnectInstructions } from "@/compositions/caldav-connect/caldav-connect";
import { CalendarPermissionsCard } from "@/compositions/calendar-permissions/components/calendar-permissions-card";
import { CalendarPermissionsConnect } from "@/compositions/calendar-permissions/calendar-permissions-connect";
import { CalendarPermissionsHeader } from "@/compositions/calendar-permissions/components/calendar-permissions-header";
import { CalendarPermissionsIconPair } from "@/compositions/calendar-permissions/components/calendar-permissions-icon-pair";
import { CalendarPermissionsContent } from "@/compositions/calendar-permissions/components/calendar-permissions-content";
import { CalendarPermissionsListSection } from "@/compositions/calendar-permissions/components/calendar-permissions-list-section";
import FastMailInstructions from "@/content/caldav-instructions/fastmail.mdx";

const ConnectFastMailPage: FC = () => {
  return (
    <CalendarPermissionsCard>
      <CalendarPermissionsConnect>
        <CalendarPermissionsHeader>
          <CalendarPermissionsIconPair provider="fastmail" />
          <CalendarPermissionsContent>
            <Heading1>Connect Fastmail</Heading1>
          </CalendarPermissionsContent>
        </CalendarPermissionsHeader>
        <CalendarPermissionsListSection>
          <CalDAVConnectInstructions>
            <FastMailInstructions />
          </CalDAVConnectInstructions>
          <CalDAVConnectForm provider="fastmail" backHref="/dashboard/accounts/connect" />
        </CalendarPermissionsListSection>
      </CalendarPermissionsConnect>
    </CalendarPermissionsCard>
  );
};

export default ConnectFastMailPage;
