import { memo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import useSWR from "swr";
import Copy from "lucide-react/dist/esm/icons/copy";
import Check from "lucide-react/dist/esm/icons/check";
import { fetcher, apiFetch } from "../../../lib/fetcher";
import { BackButton } from "../../../components/ui/primitives/back-button";
import { Input } from "../../../components/ui/primitives/input";
import { Text } from "../../../components/ui/primitives/text";
import { DashboardSection } from "../../../components/ui/primitives/dashboard-heading";
import { Button, ButtonIcon } from "../../../components/ui/primitives/button";
import { ProviderIcon } from "../../../components/ui/primitives/provider-icon";
import {
  NavigationMenu,
  NavigationMenuCheckboxItem,
  NavigationMenuItemIcon,
  NavigationMenuItemLabel,
  NavigationMenuToggleItem,
} from "../../../components/ui/composites/navigation-menu/navigation-menu-items";
import {
  NavigationMenuEditableTemplateItem,
} from "../../../components/ui/composites/navigation-menu/navigation-menu-editable";
import { TemplateText } from "../../../components/ui/primitives/template-text";
import type { CalendarSource } from "../../../types/api";

type ICalTokenResponse = {
  token: string;
  icalUrl: string | null;
};

interface FeedSettings {
  includeEventName: boolean;
  includeEventDescription: boolean;
  includeEventLocation: boolean;
  excludeAllDayEvents: boolean;
  customEventName: string;
}

export const Route = createFileRoute("/(dashboard)/dashboard/ical")({
  component: ICalPage,
});

function ICalPage() {
  return (
    <div className="flex flex-col gap-1.5">
      <BackButton />
      <ICalLinkSection />
      <SourceSelectionSection />
      <FeedSettingsSection />
    </div>
  );
}

function ICalLinkSection() {
  const { data } = useSWR<ICalTokenResponse>("/api/ical/token", fetcher);

  return (
    <div className="flex flex-col gap-2">
      <DashboardSection
        title="iCal Link"
        description="Subscribe to this link in any calendar app to see your aggregated events."
      />
      <div className="flex gap-1.5">
        <Input
          readOnly
          value={data?.icalUrl ?? ""}
          placeholder="No iCal link available"
          className="text-sm"
        />
        <CopyButton value={data?.icalUrl ?? null} />
      </div>
    </div>
  );
}

function CopyButton({ value }: { value: string | null }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="border"
      className="shrink-0 aspect-square"
      onClick={handleCopy}
      disabled={!value}
    >
      <ButtonIcon>
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </ButtonIcon>
    </Button>
  );
}

function patchIfPresent<T>(current: T | undefined, patch: Partial<T>): T | undefined {
  if (current) return { ...current, ...patch };
  return current;
}

function FeedSettingsSection() {
  const { data: settings, mutate } = useSWR<FeedSettings>("/api/ical/settings", fetcher);

  if (!settings) return null;

  const patchSettings = (patch: Partial<FeedSettings>) => {
    mutate(
      async (current) => {
        await apiFetch("/api/ical/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patch),
        });
        return patchIfPresent(current, patch);
      },
      {
        optimisticData: patchIfPresent(settings, patch),
        rollbackOnError: true,
        revalidate: false,
      },
    );
  };

  const templateVariables = { event_name: "Event Name", calendar_name: "Calendar Name" };

  return (
    <>
      <DashboardSection
        title="Feed Settings"
        description={<>Choose which event details are included in your iCal feed. Use <Text as="span" size="sm" className="text-template inline">{"{{calendar_name}}"}</Text> or <Text as="span" size="sm" className="text-template inline">{"{{event_name}}"}</Text> in text fields for dynamic values.</>}
      />
      <NavigationMenu>
        <NavigationMenuEditableTemplateItem
          label="Event Name"
          value={settings.customEventName || "{{event_name}}"}
          disabled={settings.includeEventName}
          valueContent={
            <TemplateText
              template={settings.customEventName || "{{event_name}}"}
              variables={templateVariables}
              disabled={settings.includeEventName}
            />
          }
          renderInput={(live) => (
            <TemplateText
              template={live}
              variables={templateVariables}
            />
          )}
          onCommit={(customEventName) => patchSettings({ customEventName })}
        />
        <NavigationMenuToggleItem
          checked={settings.includeEventName}
          onCheckedChange={(checked) => {
            if (checked) {
              patchSettings({ includeEventName: true, customEventName: "{{event_name}}" });
            } else {
              patchSettings({ includeEventName: false, customEventName: "Busy" });
            }
          }}
        >
          <NavigationMenuItemLabel>Include Event Name</NavigationMenuItemLabel>
        </NavigationMenuToggleItem>
        <NavigationMenuToggleItem
          checked={settings.includeEventDescription}
          onCheckedChange={(checked) => patchSettings({ includeEventDescription: checked })}
        >
          <NavigationMenuItemLabel>Include Event Description</NavigationMenuItemLabel>
        </NavigationMenuToggleItem>
        <NavigationMenuToggleItem
          checked={settings.includeEventLocation}
          onCheckedChange={(checked) => patchSettings({ includeEventLocation: checked })}
        >
          <NavigationMenuItemLabel>Include Event Location</NavigationMenuItemLabel>
        </NavigationMenuToggleItem>
        <NavigationMenuToggleItem
          checked={settings.excludeAllDayEvents}
          onCheckedChange={(checked) => patchSettings({ excludeAllDayEvents: checked })}
        >
          <NavigationMenuItemLabel>Exclude All Day Events</NavigationMenuItemLabel>
        </NavigationMenuToggleItem>
      </NavigationMenu>
    </>
  );
}

function updateSourceInList(sources: CalendarSource[], sourceId: string, checked: boolean) {
  return sources.map((source) =>
    source.id === sourceId ? { ...source, includeInIcalFeed: checked } : source,
  );
}

function SourceSelectionSection() {
  const { data: sources, mutate } = useSWR<CalendarSource[]>("/api/sources", fetcher);
  const pullSources = sources?.filter((source) => source.capabilities.includes("pull"));


    const handleToggle = (sourceId: string, checked: boolean) => {
      mutate(
        async (current) => {
          if (!current) return current;
          await apiFetch(`/api/sources/${sourceId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ includeInIcalFeed: checked }),
          });
          return updateSourceInList(current, sourceId, checked);
        },
        {
          optimisticData: (current) =>
            current ? updateSourceInList(current, sourceId, checked) : [],
          rollbackOnError: true,
          revalidate: false,
        },
      );
    };

  if (!pullSources || pullSources.length === 0) {
    return (
      <DashboardSection
        title="Sources"
        description={sources ? "No calendar sources to include. Import calendars first." : "Loading sources..."}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <DashboardSection
        title="Sources"
        description="Select which calendars contribute events to your iCal feed."
      />
      <NavigationMenu>
        {pullSources.map((source) => (
          <SourceCheckboxItem
            key={source.id}
            source={source}
            onToggle={handleToggle}
          />
        ))}
      </NavigationMenu>
    </div>
  );
}

const SourceCheckboxItem = memo(function SourceCheckboxItem({
  source,
  onToggle,
}: {
  source: CalendarSource;
  onToggle: (sourceId: string, checked: boolean) => void;
}) {
  return (
    <NavigationMenuCheckboxItem
      checked={source.includeInIcalFeed}
      onCheckedChange={(checked) => onToggle(source.id, checked)}
    >
      <NavigationMenuItemIcon>
        <ProviderIcon provider={source.provider} calendarType={source.calendarType} />
      </NavigationMenuItemIcon>
      <NavigationMenuItemLabel>{source.name}</NavigationMenuItemLabel>
    </NavigationMenuCheckboxItem>
  );
});
