export interface Source {
  id: string;
  name: string;
  email: string;
  provider: {
    id: string;
    name: string;
    icon: string;
  };
  eventCount: number;
  status: "synced" | "syncing" | "error" | "reauthenticate";
}

export interface Destination {
  id: string;
  name: string;
  email: string;
  provider: {
    id: string;
    name: string;
    icon: string;
  };
  eventsSynced: number;
  eventsTotal: number;
  status: "synced" | "syncing" | "error" | "reauthenticate";
}

export type FilterType =
  | "contains"
  | "does_not_contain"
  | "starts_before"
  | "ends_before"
  | "starts_after"
  | "ends_after"
  | "is_on_weekends"
  | "is_on_weekdays";

export interface Filter {
  id: string;
  type: FilterType;
  value: string;
}

export interface Group {
  id: string;
  name: string;
}
