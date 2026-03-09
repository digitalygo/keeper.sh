import { calendarAccountsTable, calendarsTable } from "@keeper.sh/database/schema";
import { asc, eq } from "drizzle-orm";
import { withAuth, withWideEvent } from "../../../utils/middleware";
import { database } from "../../../context";
import { withAccountDisplay } from "../../../utils/provider-display";

const GET = withWideEvent(
  withAuth(async ({ userId }) => {
    const calendars = await database
      .select({
        id: calendarsTable.id,
        name: calendarsTable.name,
        calendarType: calendarsTable.calendarType,
        capabilities: calendarsTable.capabilities,
        accountId: calendarAccountsTable.id,
        provider: calendarAccountsTable.provider,
        displayName: calendarAccountsTable.displayName,
        email: calendarAccountsTable.email,
        accountIdentifier: calendarAccountsTable.accountId,
        needsReauthentication: calendarAccountsTable.needsReauthentication,
        includeInIcalFeed: calendarsTable.includeInIcalFeed,
      })
      .from(calendarsTable)
      .innerJoin(calendarAccountsTable, eq(calendarsTable.accountId, calendarAccountsTable.id))
      .where(eq(calendarsTable.userId, userId))
      .orderBy(asc(calendarsTable.createdAt));

    return Response.json(calendars.map((calendar) => withAccountDisplay(calendar)));
  }),
);

export { GET };
