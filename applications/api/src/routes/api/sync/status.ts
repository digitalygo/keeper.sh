import { calendarsTable, syncStatusTable } from "@keeper.sh/database/schema";
import { and, eq, inArray } from "drizzle-orm";
import { withAuth, withWideEvent } from "../../../utils/middleware";
import { database } from "../../../context";

const GET = withWideEvent(
  withAuth(async ({ userId }) => {
    const statuses = await database
      .select({
        calendarId: syncStatusTable.calendarId,
        lastSyncedAt: syncStatusTable.lastSyncedAt,
        localEventCount: syncStatusTable.localEventCount,
        remoteEventCount: syncStatusTable.remoteEventCount,
      })
      .from(syncStatusTable)
      .innerJoin(
        calendarsTable,
        eq(syncStatusTable.calendarId, calendarsTable.id),
      )
      .where(
        and(
          eq(calendarsTable.userId, userId),
          inArray(calendarsTable.role, ["destination", "both"]),
        ),
      );

    const destinations = statuses.map((status) => ({
      calendarId: status.calendarId,
      inSync: status.localEventCount === status.remoteEventCount,
      lastSyncedAt: status.lastSyncedAt,
      localEventCount: status.localEventCount,
      remoteEventCount: status.remoteEventCount,
    }));

    return Response.json({ destinations });
  }),
);

export { GET };
