import type { Source, Destination, Filter, Group } from "../types";

export const MOCK_GROUPS: Group[] = [
  { id: "group-1", name: "Work" },
  { id: "group-2", name: "Personal" },
  { id: "group-3", name: "Family" },
];

export const MOCK_SOURCES: Source[] = [
  {
    id: "source-1",
    name: "Personal",
    email: "john@gmail.com",
    provider: {
      id: "google",
      name: "Google",
      icon: "/integrations/icon-google.svg",
    },
    eventCount: 142,
    status: "synced",
  },
  {
    id: "source-2",
    name: "Work",
    email: "john@company.com",
    provider: {
      id: "google",
      name: "Google",
      icon: "/integrations/icon-google.svg",
    },
    eventCount: 89,
    status: "reauthenticate",
  },
  {
    id: "source-3",
    name: "Family",
    email: "john@icloud.com",
    provider: {
      id: "icloud",
      name: "iCloud",
      icon: "/integrations/icon-icloud.svg",
    },
    eventCount: 23,
    status: "syncing",
  },
];

export const MOCK_DESTINATIONS: Destination[] = [
  {
    id: "dest-1",
    name: "Calendar",
    email: "john@outlook.com",
    provider: {
      id: "outlook",
      name: "Outlook",
      icon: "/integrations/icon-outlook.svg",
    },
    eventsSynced: 198,
    eventsTotal: 254,
    status: "syncing",
  },
  {
    id: "dest-2",
    name: "Keeper",
    email: "john@fastmail.com",
    provider: {
      id: "fastmail",
      name: "Fastmail",
      icon: "/integrations/icon-fastmail.svg",
    },
    eventsSynced: 254,
    eventsTotal: 254,
    status: "synced",
  },
];

export const INITIAL_FILTERS: Filter[] = [
  {
    id: "filter-1",
    type: "contains",
    value: "meeting",
  },
  {
    id: "filter-2",
    type: "does_not_contain",
    value: "cancelled",
  },
  {
    id: "filter-3",
    type: "starts_after",
    value: "9:00 AM EST",
  },
  {
    id: "filter-4",
    type: "ends_before",
    value: "5:00 PM EST",
  },
  {
    id: "filter-5",
    type: "is_on_weekdays",
    value: "",
  },
];
