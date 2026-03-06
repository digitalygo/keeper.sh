import { ProviderIcon } from "../ui/provider-icon";
import {
  NavigationMenu,
  NavigationMenuCheckboxItem,
  NavigationMenuEmptyItem,
  NavigationMenuItemIcon,
  NavigationMenuItemLabel,
} from "../ui/navigation-menu";
import { getCalendarProvider } from "../../utils/calendars";
import type { CalendarEntry } from "../../types/api";

interface CalendarCheckboxListProps {
  calendars: CalendarEntry[];
  selectedIds: Set<string>;
  onToggle: (calendarId: string, checked: boolean) => void;
  emptyLabel: string;
}

export function CalendarCheckboxList({
  calendars,
  selectedIds,
  onToggle,
  emptyLabel,
}: CalendarCheckboxListProps) {
  return (
    <NavigationMenu>
      {calendars.length === 0 ? (
        <NavigationMenuEmptyItem>{emptyLabel}</NavigationMenuEmptyItem>
      ) : (
        calendars.map((calendar) => (
          <NavigationMenuCheckboxItem
            key={calendar.id}
            checked={selectedIds.has(calendar.id)}
            onCheckedChange={(checked) => onToggle(calendar.id, checked)}
          >
            <NavigationMenuItemIcon>
              <ProviderIcon
                provider={getCalendarProvider(calendar)}
                calendarType={calendar.calendarType}
              />
            </NavigationMenuItemIcon>
            <NavigationMenuItemLabel>{calendar.name}</NavigationMenuItemLabel>
          </NavigationMenuCheckboxItem>
        ))
      )}
    </NavigationMenu>
  );
}
