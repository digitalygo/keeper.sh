import Image from "next/image";
import { Button } from "@base-ui-components/react/button";
import {
  button,
  integrationCard,
  integrationIcon,
  integrationInfo,
  integrationName,
  integrationDescription,
} from "@/styles";

const calendarSources = [
  {
    id: "1",
    name: "Work Calendar",
    url: "https://calendar.google.com/calendar/ical/...",
    lastSynced: "15m ago",
  },
  {
    id: "2",
    name: "Personal",
    url: "https://outlook.office365.com/owa/calendar/...",
    lastSynced: "2h ago",
  },
];

const destinations = [
  {
    id: "google",
    name: "Google Calendar",
    description: "Sync your aggregated events to Google Calendar",
    icon: "/integrations/icon-google.svg",
  },
  {
    id: "outlook",
    name: "Outlook",
    description: "Sync your aggregated events to Outlook",
    icon: "/integrations/icon-outlook.svg",
  },
  {
    id: "caldav",
    name: "CalDAV",
    description: "Sync to any CalDAV-compatible server",
  },
];

export default function IntegrationsPage() {
  return (
    <div className="flex-1 flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Calendar Sources</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Add iCal links to import events from other calendars
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          {calendarSources.map((source) => (
            <div key={source.id} className={integrationCard()}>
              <div className={integrationInfo()}>
                <div className={integrationName()}>{source.name}</div>
                <div className={integrationDescription()}>
                  Last synced {source.lastSynced}
                </div>
              </div>
              <Button className={button({ variant: "secondary" })}>Remove</Button>
            </div>
          ))}
          <Button className={button({ variant: "secondary" })}>Add iCal Link</Button>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Destinations</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Push your aggregated events to other calendar apps
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          {destinations.map((destination) => (
            <div key={destination.id} className={integrationCard()}>
              <div className={integrationIcon()}>
                {destination.icon && (
                  <Image
                    src={destination.icon}
                    alt={destination.name}
                    width={20}
                    height={20}
                  />
                )}
              </div>
              <div className={integrationInfo()}>
                <div className={integrationName()}>{destination.name}</div>
                <div className={integrationDescription()}>{destination.description}</div>
              </div>
              <Button className={button({ variant: "secondary" })}>Connect</Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
