import type { FC } from "react";
import { Calendar } from "lucide-react";
import { Heading1 } from "@/components/heading";
import { GenericCalDAVConnectForm } from "@/compositions/caldav-connect/generic-caldav-connect";
import { CalDAVConnectInstructions } from "@/compositions/caldav-connect/caldav-connect";
import { CalendarPermissionsCard } from "@/compositions/calendar-permissions/components/calendar-permissions-card";
import { CalendarPermissionsConnect } from "@/compositions/calendar-permissions/calendar-permissions-connect";
import { CalendarPermissionsHeader } from "@/compositions/calendar-permissions/components/calendar-permissions-header";
import { CalendarPermissionsContent } from "@/compositions/calendar-permissions/components/calendar-permissions-content";
import { CalendarPermissionsListSection } from "@/compositions/calendar-permissions/components/calendar-permissions-list-section";
import GenericCalDAVInstructions from "@/content/caldav-instructions/generic.mdx";

const ConnectCalDAVPage: FC = () => {
  return (
    <CalendarPermissionsCard>
      <CalendarPermissionsConnect>
        <CalendarPermissionsHeader>
          <div className="size-14 rounded-xl border border-border shadow-xs bg-surface p-1 flex items-center justify-center">
            <Calendar size={32} className="text-foreground-muted" />
          </div>
          <CalendarPermissionsContent>
            <Heading1>Connect CalDAV Server</Heading1>
          </CalendarPermissionsContent>
        </CalendarPermissionsHeader>
        <CalendarPermissionsListSection>
          <CalDAVConnectInstructions>
            <GenericCalDAVInstructions />
          </CalDAVConnectInstructions>
          <GenericCalDAVConnectForm backHref="/dashboard/accounts/connect" />
        </CalendarPermissionsListSection>
      </CalendarPermissionsConnect>
    </CalendarPermissionsCard>
  );
};

export default ConnectCalDAVPage;
