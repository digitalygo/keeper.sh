import { syncStatusTable, calendarsTable } from "@keeper.sh/database/schema";
import { createWebsocketHandler } from "@keeper.sh/broadcast";
import type { Socket } from "@keeper.sh/broadcast";
import { and, eq, inArray } from "drizzle-orm";
import { database } from "../context";

const sendInitialSyncStatus = async (userId: string, socket: Socket): Promise<void> => {
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

  for (const status of statuses) {
    socket.send(
      JSON.stringify({
        data: {
          calendarId: status.calendarId,
          inSync: status.localEventCount === status.remoteEventCount,
          lastSyncedAt: status.lastSyncedAt?.toISOString(),
          localEventCount: status.localEventCount,
          remoteEventCount: status.remoteEventCount,
          status: "idle",
        },
        event: "sync:status",
      }),
    );
  }
};

const websocketHandler = createWebsocketHandler({
  onConnect: sendInitialSyncStatus,
});

export { websocketHandler };
