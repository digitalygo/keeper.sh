import {
  calendarsTable,
  sourceDestinationMappingsTable,
} from "@keeper.sh/database/schema";
import { and, eq, inArray } from "drizzle-orm";
import { database } from "../context";

const EMPTY_LIST_COUNT = 0;

interface SourceDestinationMapping {
  id: string;
  sourceCalendarId: string;
  destinationCalendarId: string;
  createdAt: Date;
  calendarType: string;
}

const getUserMappings = async (userId: string): Promise<SourceDestinationMapping[]> => {
  const userSourceCalendars = await database
    .select({
      calendarType: calendarsTable.calendarType,
      id: calendarsTable.id,
    })
    .from(calendarsTable)
    .where(
      and(
        eq(calendarsTable.userId, userId),
        inArray(calendarsTable.role, ["source", "both"]),
      ),
    );

  if (userSourceCalendars.length === EMPTY_LIST_COUNT) {
    return [];
  }

  const calendarIds = userSourceCalendars.map((c) => c.id);
  const typeMap = new Map(userSourceCalendars.map((c) => [c.id, c.calendarType]));

  const mappings = await database
    .select()
    .from(sourceDestinationMappingsTable)
    .where(inArray(sourceDestinationMappingsTable.sourceCalendarId, calendarIds));

  return mappings.map((mapping) => ({
    ...mapping,
    calendarType: typeMap.get(mapping.sourceCalendarId) ?? "unknown",
  }));
};

const getDestinationsForSource = async (sourceCalendarId: string): Promise<string[]> => {
  const mappings = await database
    .select({ destinationCalendarId: sourceDestinationMappingsTable.destinationCalendarId })
    .from(sourceDestinationMappingsTable)
    .where(eq(sourceDestinationMappingsTable.sourceCalendarId, sourceCalendarId));

  return mappings.map((mapping) => mapping.destinationCalendarId);
};

const updateSourceMappings = async (
  userId: string,
  sourceCalendarId: string,
  destinationCalendarIds: string[],
): Promise<void> => {
  const userDestCalendars = await database
    .select({ id: calendarsTable.id })
    .from(calendarsTable)
    .where(
      and(
        eq(calendarsTable.userId, userId),
        inArray(calendarsTable.role, ["destination", "both"]),
      ),
    );

  const validIds = new Set(userDestCalendars.map((c) => c.id));
  const filtered = destinationCalendarIds.filter((id) => validIds.has(id));

  await database
    .delete(sourceDestinationMappingsTable)
    .where(eq(sourceDestinationMappingsTable.sourceCalendarId, sourceCalendarId));

  if (filtered.length > EMPTY_LIST_COUNT) {
    const mappingsToInsert = filtered.map((destinationCalendarId) => ({
      destinationCalendarId,
      sourceCalendarId,
    }));

    await database
      .insert(sourceDestinationMappingsTable)
      .values(mappingsToInsert)
      .onConflictDoNothing();
  }
};

const createMappingsForNewSource = async (userId: string, sourceCalendarId: string): Promise<void> => {
  const userDestCalendars = await database
    .select({ id: calendarsTable.id })
    .from(calendarsTable)
    .where(
      and(
        eq(calendarsTable.userId, userId),
        inArray(calendarsTable.role, ["destination", "both"]),
      ),
    );

  if (userDestCalendars.length === EMPTY_LIST_COUNT) {
    return;
  }

  const mappingsToInsert = userDestCalendars.map((cal) => ({
    destinationCalendarId: cal.id,
    sourceCalendarId,
  }));

  await database
    .insert(sourceDestinationMappingsTable)
    .values(mappingsToInsert)
    .onConflictDoNothing();
};

const createMappingsForNewDestination = async (
  userId: string,
  destinationCalendarId: string,
): Promise<void> => {
  const userSourceCalendars = await database
    .select({ id: calendarsTable.id })
    .from(calendarsTable)
    .where(
      and(
        eq(calendarsTable.userId, userId),
        inArray(calendarsTable.role, ["source", "both"]),
      ),
    );

  if (userSourceCalendars.length === EMPTY_LIST_COUNT) {
    return;
  }

  const mappingsToInsert = userSourceCalendars.map((cal) => ({
    destinationCalendarId,
    sourceCalendarId: cal.id,
  }));

  await database
    .insert(sourceDestinationMappingsTable)
    .values(mappingsToInsert)
    .onConflictDoNothing();
};

export {
  getUserMappings,
  getDestinationsForSource,
  updateSourceMappings,
  createMappingsForNewSource,
  createMappingsForNewDestination,
};
