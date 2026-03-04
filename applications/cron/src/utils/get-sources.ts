import { calendarsTable } from "@keeper.sh/database/schema";
import { and, eq, inArray } from "drizzle-orm";
import type { Plan } from "@keeper.sh/premium";
import { database, premiumService } from "../context";

const fetchCalendars = (calendarType?: string) => {
  if (calendarType) {
    return database
      .select()
      .from(calendarsTable)
      .where(
        and(
          eq(calendarsTable.calendarType, calendarType),
          inArray(calendarsTable.role, ["source", "both"]),
        ),
      );
  }
  return database
    .select()
    .from(calendarsTable)
    .where(inArray(calendarsTable.role, ["source", "both"]));
};

const getSourcesByPlan = async (
  targetPlan: Plan,
  calendarType?: string,
): Promise<(typeof calendarsTable.$inferSelect)[]> => {
  const sources = await fetchCalendars(calendarType);

  const userPlans = new Map<string, Plan>();

  for (const source of sources) {
    if (!userPlans.has(source.userId)) {
      userPlans.set(source.userId, await premiumService.getUserPlan(source.userId));
    }
  }

  return sources.filter((source) => userPlans.get(source.userId) === targetPlan);
};

const getUsersWithDestinationsByPlan = async (targetPlan: Plan): Promise<string[]> => {
  const destinations = await database
    .select({ userId: calendarsTable.userId })
    .from(calendarsTable)
    .where(inArray(calendarsTable.role, ["destination", "both"]));

  const uniqueUserIds = [...new Set(destinations.map(({ userId }) => userId))];
  const usersWithPlan: string[] = [];

  for (const userId of uniqueUserIds) {
    const plan = await premiumService.getUserPlan(userId);
    if (plan === targetPlan) {
      usersWithPlan.push(userId);
    }
  }

  return usersWithPlan;
};

export { getSourcesByPlan, getUsersWithDestinationsByPlan };
