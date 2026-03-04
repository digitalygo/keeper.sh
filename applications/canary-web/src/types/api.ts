export interface CalendarAccount {
  id: string;
  provider: string;
  displayName: string | null;
  email: string | null;
  authType: string;
  needsReauthentication: boolean;
  calendarCount: number;
  createdAt: string;
}

export interface CalendarSource {
  id: string;
  name: string;
  calendarType: string;
  capabilities: string[];
  accountId: string;
  provider: string;
  displayName: string | null;
  email: string | null;
  needsReauthentication: boolean;
}

export interface CalendarDetail {
  id: string;
  name: string;
  calendarType: string;
  capabilities: string[];
  provider: string;
  url: string | null;
  calendarUrl: string | null;
  excludeWorkingLocation: boolean;
  excludeFocusTime: boolean;
  excludeOutOfOffice: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SyncProfile {
  id: string;
  name: string;
  sources: string[];
  destinations: string[];
  createdAt: string;
}

export interface CalendarEntry {
  id: string;
  name: string;
  calendarType: string;
  capabilities: string[];
  provider?: string;
}
