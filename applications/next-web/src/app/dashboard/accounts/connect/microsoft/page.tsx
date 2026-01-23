import type { FC } from "react";
import { Heading1 } from "@/components/heading";
import { Copy } from "@/components/copy";
import { FeatureList } from "@/components/feature-list";
import { FeatureListItem } from "@/components/feature-list-item";
import { CalendarPermissionsConnect } from "@/compositions/calendar-permissions/calendar-permissions-connect";
import { CalendarPermissionsCard } from "@/compositions/calendar-permissions/components/calendar-permissions-card";
import { CalendarPermissionsHeader } from "@/compositions/calendar-permissions/components/calendar-permissions-header";
import { CalendarPermissionsIconPair } from "@/compositions/calendar-permissions/components/calendar-permissions-icon-pair";
import { CalendarPermissionsContent } from "@/compositions/calendar-permissions/components/calendar-permissions-content";
import { CalendarPermissionsListSection } from "@/compositions/calendar-permissions/components/calendar-permissions-list-section";
import { CalendarPermissionsListWrapper } from "@/compositions/calendar-permissions/components/calendar-permissions-list-wrapper";
import { CalendarPermissionsDivider } from "@/compositions/calendar-permissions/components/calendar-permissions-divider";
import { CalendarPermissionsActions } from "@/compositions/calendar-permissions/components/calendar-permissions-actions";

const ConnectMicrosoftPage: FC = () => {
  return (
    <CalendarPermissionsCard>
      <CalendarPermissionsConnect>
        <CalendarPermissionsHeader>
          <CalendarPermissionsIconPair provider="microsoft-365" />
          <CalendarPermissionsContent>
            <Heading1>Connect Microsoft 365</Heading1>
            <Copy>Start importing your events and sync them across all your calendars.</Copy>
          </CalendarPermissionsContent>
        </CalendarPermissionsHeader>
        <CalendarPermissionsListSection>
          <CalendarPermissionsListWrapper>
            <FeatureList>
              <FeatureListItem>See your email address</FeatureListItem>
              <FeatureListItem>View a list of your calendars</FeatureListItem>
              <FeatureListItem>View events, summaries and details</FeatureListItem>
              <FeatureListItem>Add or remove calendar events</FeatureListItem>
            </FeatureList>
          </CalendarPermissionsListWrapper>
          <CalendarPermissionsDivider />
          <CalendarPermissionsActions provider="microsoft-365" backHref="/dashboard/accounts/connect" />
        </CalendarPermissionsListSection>
      </CalendarPermissionsConnect>
    </CalendarPermissionsCard>
  );
};

export default ConnectMicrosoftPage;
