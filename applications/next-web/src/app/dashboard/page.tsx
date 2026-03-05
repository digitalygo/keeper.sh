"use client";

import { CalendarDays, Calendar, Settings, LogOut, CalendarPlus, Sparkles, CircleAlert, Lightbulb, User } from "lucide-react";
import { FC, useState } from "react";
import KeeperLogo from "@/assets/keeper.svg";
import {
  NavigationMenu,
  NavigationItem,
  NavigationItemIcon,
  NavigationItemLabel,
  NavigationItemRightContent,
  NavigationPopoverItem,
  NavigationItemLink,
} from "@/components/navigation-menu";
import { AccountsPreview, AccountItem } from "@/compositions/connected-accounts/connected-accounts";
import { Copy } from "@/components/copy";

const accounts = [
  { id: '1', href: '/dashboard/accounts/1', icon: '/integrations/icon-google.svg', name: 'Personal', email: 'ridafkih@gmail.com', eventCount: 142, status: 'synced' as const },
  { id: '2', href: '/dashboard/accounts/2', icon: '/integrations/icon-google.svg', name: 'Work', email: 'rida@ridafkih.dev', eventCount: 89, status: 'error' as const },
  { id: '3', href: '/dashboard/accounts/3', icon: '/integrations/icon-icloud.svg', name: 'Family', email: 'rida@icloud.com', eventCount: 23, status: 'syncing' as const },
  { id: '4', href: '/dashboard/accounts/4', icon: '/integrations/icon-fastmail.svg', name: 'Personal', email: 'rida@keeper.sh', eventCount: 56, status: 'synced' as const },
];

const DashboardPage: FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-12 items-stretch">
      <div className="flex flex-col gap-2 items-stretch">
        <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-hidden p-0.5">
          <NavigationItem href="/dashboard/accounts/connect">
            <NavigationItemIcon>
              <CalendarPlus className="text-foreground-muted" size={15} />
              <NavigationItemLabel>Connect Calendar Account</NavigationItemLabel>
            </NavigationItemIcon>
            <NavigationItemRightContent />
          </NavigationItem>
        </NavigationMenu>

        <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-visible p-0.5">
          <NavigationPopoverItem
            expanded={expanded}
            onToggle={() => setExpanded(!expanded)}
            trigger={
              <>
                <NavigationItemIcon>
                  <User className="text-foreground-muted" size={15} />
                  <NavigationItemLabel>Calendar Accounts</NavigationItemLabel>
                </NavigationItemIcon>
                <NavigationItemRightContent>
                  <AccountsPreview />
                </NavigationItemRightContent>
              </>
            }
          >
            {accounts.map((account) => (
              <AccountItem
                key={account.id}
                className="rounded-[0.6875rem]"
                href={account.href}
                icon={account.icon}
                name={account.name}
                email={account.email}
                eventCount={account.eventCount}
                status={account.status}
              />
            ))}
          </NavigationPopoverItem>

          <NavigationItem href="/dashboard/sync-groups/1">
            <NavigationItemIcon>
              <Calendar className="text-foreground-muted" size={15} />
              <NavigationItemLabel>Calendars</NavigationItemLabel>
            </NavigationItemIcon>
            <NavigationItemRightContent />
          </NavigationItem>

          <NavigationItem href="/dashboard/events">
            <NavigationItemIcon>
              <CalendarDays className="text-foreground-muted" size={15} />
              <NavigationItemLabel>Events</NavigationItemLabel>
            </NavigationItemIcon>
            <NavigationItemRightContent />
          </NavigationItem>

          <NavigationItem href="/dashboard/settings">
            <NavigationItemIcon>
              <Settings className="text-foreground-muted" size={15} />
              <NavigationItemLabel>Account Settings</NavigationItemLabel>
            </NavigationItemIcon>
            <NavigationItemRightContent />
          </NavigationItem>
        </NavigationMenu>

        <NavigationMenu className="overflow-hidden rounded-2xl">
          <NavigationItem href="/dashboard/upgrade" className="bg-neutral-950 text-white border-neutral-800 border rounded-2xl hover:bg-neutral-900">
            <NavigationItemIcon>
              <Sparkles className="text-neutral-400" size={15} />
              <Copy className="text-neutral-200">Upgrade to Pro</Copy>
            </NavigationItemIcon>
            <NavigationItemRightContent />
          </NavigationItem>
        </NavigationMenu>

        <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-hidden p-0.5">
          <NavigationItem>
            <NavigationItemIcon>
              <CircleAlert className="text-foreground-muted" size={15} />
              <NavigationItemLabel>Report Issue</NavigationItemLabel>
            </NavigationItemIcon>
            <NavigationItemRightContent />
          </NavigationItem>

          <NavigationItem>
            <NavigationItemIcon>
              <Lightbulb className="text-foreground-muted" size={15} />
              <NavigationItemLabel>Feature Suggestion</NavigationItemLabel>
            </NavigationItemIcon>
            <NavigationItemRightContent />
          </NavigationItem>
        </NavigationMenu>

        <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-hidden p-0.5">
          <NavigationItem href="/dashboard/logout">
            <NavigationItemIcon>
              <LogOut className="text-foreground-muted" size={15} />
              <NavigationItemLabel>Logout</NavigationItemLabel>
            </NavigationItemIcon>
            <NavigationItemRightContent />
          </NavigationItem>
        </NavigationMenu>
      </div>

      <KeeperLogo className="size-8 text-border self-center" />
      </div>
  );
};

export default DashboardPage;
