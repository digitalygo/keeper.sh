import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import useSWR from "swr";
import { CalendarPlus, CalendarArrowDown, Calendar, CalendarDays, Settings, Sparkles, LogOut, Bell, Eye } from "lucide-react";
import { signOut } from "../../../lib/auth";
import KeeperLogo from "../../../assets/keeper.svg?react";
import { EventGraph } from "../../../components/dashboard/event-graph";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuItemIcon,
  NavigationMenuItemLabel,
  NavigationMenuItemTrailing,
  NavigationMenuCheckboxItem,
  NavigationMenuToggleItem,
} from "../../../components/ui/navigation-menu";

export const Route = createFileRoute("/(dashboard)/dashboard/")({
  component: RouteComponent,
});

const fetcher = async <T,>(url: string): Promise<T> => {
  const response = await fetch(url, { credentials: "include" });
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
};

function RouteComponent() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut();
    navigate({ to: "/login" });
  };
  const [notifications, setNotifications] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);
  const { data: sources = [] } = useSWR<unknown[]>("/api/sources", fetcher);
  const { data: destinations = [] } = useSWR<unknown[]>("/api/destinations", fetcher);
  const hasCalendars = sources.length > 0 || destinations.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <EventGraph />
      <div className="flex flex-col gap-1.5">
        <NavigationMenu>
          <NavigationMenuItem to="/dashboard/connect/source">
            <NavigationMenuItemIcon>
              <CalendarPlus size={15} />
              <NavigationMenuItemLabel>Add Source Calendar</NavigationMenuItemLabel>
            </NavigationMenuItemIcon>
            <NavigationMenuItemTrailing />
          </NavigationMenuItem>
          <NavigationMenuItem to="/dashboard/connect/destination">
            <NavigationMenuItemIcon>
              <CalendarArrowDown size={15} />
              <NavigationMenuItemLabel>Add Destination Calendar</NavigationMenuItemLabel>
            </NavigationMenuItemIcon>
            <NavigationMenuItemTrailing />
          </NavigationMenuItem>
          {hasCalendars && (
            <NavigationMenuItem to="/dashboard/calendars">
              <NavigationMenuItemIcon>
                <Calendar size={15} />
                <NavigationMenuItemLabel>Calendars</NavigationMenuItemLabel>
              </NavigationMenuItemIcon>
              <NavigationMenuItemTrailing />
            </NavigationMenuItem>
          )}
          <NavigationMenuItem to="/dashboard/events">
            <NavigationMenuItemIcon>
              <CalendarDays size={15} />
              <NavigationMenuItemLabel>Events</NavigationMenuItemLabel>
            </NavigationMenuItemIcon>
            <NavigationMenuItemTrailing />
          </NavigationMenuItem>
        </NavigationMenu>
        <NavigationMenu>
          <NavigationMenuToggleItem checked={notifications} onCheckedChange={setNotifications}>
            <NavigationMenuItemIcon>
              <Bell size={15} />
              <NavigationMenuItemLabel>Notifications</NavigationMenuItemLabel>
            </NavigationMenuItemIcon>
          </NavigationMenuToggleItem>
          <NavigationMenuCheckboxItem checked={publicProfile} onCheckedChange={setPublicProfile}>
            <NavigationMenuItemIcon>
              <Eye size={15} />
              <NavigationMenuItemLabel>Public Profile</NavigationMenuItemLabel>
            </NavigationMenuItemIcon>
          </NavigationMenuCheckboxItem>
        </NavigationMenu>
        <NavigationMenu variant="highlight">
          <NavigationMenuItem to="/dashboard/upgrade">
            <NavigationMenuItemIcon>
              <Sparkles size={15} />
              <NavigationMenuItemLabel>Upgrade Account</NavigationMenuItemLabel>
            </NavigationMenuItemIcon>
            <NavigationMenuItemTrailing />
          </NavigationMenuItem>
        </NavigationMenu>
        <NavigationMenu>
          <NavigationMenuItem to="/dashboard/settings">
            <NavigationMenuItemIcon>
              <Settings size={15} />
              <NavigationMenuItemLabel>Settings</NavigationMenuItemLabel>
            </NavigationMenuItemIcon>
            <NavigationMenuItemTrailing />
          </NavigationMenuItem>
          <NavigationMenuItem onClick={handleLogout}>
            <NavigationMenuItemIcon>
              <LogOut size={15} />
              <NavigationMenuItemLabel>Logout</NavigationMenuItemLabel>
            </NavigationMenuItemIcon>
          </NavigationMenuItem>
        </NavigationMenu>
      </div>
      <KeeperLogo className="size-8 text-border-elevated self-center" />
    </div>
  );
}
