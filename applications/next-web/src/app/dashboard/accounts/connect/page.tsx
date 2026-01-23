import { FC } from "react";
import Image from "next/image";
import { Link, Calendar } from "lucide-react";
import {
  NavigationMenu,
  NavigationItem,
  NavigationItemIcon,
  NavigationItemLabel,
  NavigationItemRightContent,
} from "@/components/navigation-menu";
import { DashboardBackButton } from "@/components/dashboard-back-button";

const ConnectAccountPage: FC = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <DashboardBackButton />

      <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-hidden p-0.5">
        <NavigationItem href="/dashboard/accounts/connect/google">
          <NavigationItemIcon>
            <Image width={15} height={15} src="/integrations/icon-google.svg" alt="" />
            <NavigationItemLabel>Connect Google Calendar</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent />
        </NavigationItem>

        <NavigationItem href="/dashboard/accounts/connect/outlook">
          <NavigationItemIcon>
            <Image width={15} height={15} src="/integrations/icon-outlook.svg" alt="" />
            <NavigationItemLabel>Connect Outlook</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent />
        </NavigationItem>

        <NavigationItem href="/dashboard/accounts/connect/apple">
          <NavigationItemIcon>
            <Image width={15} height={15} src="/integrations/icon-icloud.svg" alt="" />
            <NavigationItemLabel>Connect iCloud</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent />
        </NavigationItem>

        <NavigationItem href="/dashboard/accounts/connect/microsoft">
          <NavigationItemIcon>
            <Image width={15} height={15} src="/integrations/icon-microsoft-365.svg" alt="" />
            <NavigationItemLabel>Connect Microsoft 365</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent />
        </NavigationItem>

        <NavigationItem href="/dashboard/accounts/connect/fastmail">
          <NavigationItemIcon>
            <Image width={15} height={15} src="/integrations/icon-fastmail.svg" alt="" />
            <NavigationItemLabel>Connect FastMail</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent />
        </NavigationItem>
      </NavigationMenu>

      <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-hidden p-0.5">
        <NavigationItem href="/dashboard/accounts/connect/caldav">
          <NavigationItemIcon>
            <Calendar className="text-foreground-muted" size={15} />
            <NavigationItemLabel>Connect CalDAV Server</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent />
        </NavigationItem>
      </NavigationMenu>

      <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-hidden p-0.5">
        <NavigationItem href="/dashboard/accounts/connect/ical-link">
          <NavigationItemIcon>
            <Link className="text-foreground-muted" size={15} />
            <NavigationItemLabel>Subscribe to an ICS Calendar Feed</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent />
        </NavigationItem>

        <NavigationItem href="/dashboard/accounts/connect/ics-file">
          <NavigationItemIcon>
            <Calendar className="text-foreground-muted" size={15} />
            <NavigationItemLabel>Upload an ICS Snapshot File</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent />
        </NavigationItem>
      </NavigationMenu>
    </div>
  );
};

export default ConnectAccountPage;
