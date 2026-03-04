import { calendarAccountsTable, calendarsTable } from "@keeper.sh/database/schema";
import { and, eq } from "drizzle-orm";
import { withAuth, withWideEvent } from "../../../utils/middleware";
import { ErrorResponse } from "../../../utils/responses";
import { database } from "../../../context";
import { deleteSource as deleteIcsSource } from "../../../utils/sources";
import { deleteOAuthSource } from "../../../utils/oauth-sources";
import { deleteCalDAVSource } from "../../../utils/caldav-sources";

export const GET = withWideEvent(
  withAuth(async ({ params, userId }) => {
    const { id } = params;

    if (!id) {
      return ErrorResponse.badRequest("ID is required").toResponse();
    }

    const [source] = await database
      .select({
        id: calendarsTable.id,
        name: calendarsTable.name,
        calendarType: calendarsTable.calendarType,
        provider: calendarAccountsTable.provider,
        url: calendarsTable.url,
        calendarUrl: calendarsTable.calendarUrl,
        excludeWorkingLocation: calendarsTable.excludeWorkingLocation,
        excludeFocusTime: calendarsTable.excludeFocusTime,
        excludeOutOfOffice: calendarsTable.excludeOutOfOffice,
        createdAt: calendarsTable.createdAt,
        updatedAt: calendarsTable.updatedAt,
      })
      .from(calendarsTable)
      .innerJoin(calendarAccountsTable, eq(calendarsTable.accountId, calendarAccountsTable.id))
      .where(
        and(
          eq(calendarsTable.id, id),
          eq(calendarsTable.userId, userId),
        ),
      )
      .limit(1);

    if (!source) {
      return ErrorResponse.notFound().toResponse();
    }

    return Response.json(source);
  }),
);

export const PATCH = withWideEvent(
  withAuth(async ({ request, params, userId }) => {
    const { id } = params;

    if (!id) {
      return ErrorResponse.badRequest("ID is required").toResponse();
    }

    const body = (await request.json()) as { name?: string };
    const { name } = body;

    if (!name || typeof name !== "string") {
      return ErrorResponse.badRequest("Name is required").toResponse();
    }

    const [updated] = await database
      .update(calendarsTable)
      .set({ name })
      .where(
        and(
          eq(calendarsTable.id, id),
          eq(calendarsTable.userId, userId),
        ),
      )
      .returning();

    if (!updated) {
      return ErrorResponse.notFound().toResponse();
    }

    return Response.json(updated);
  }),
);

const calendarTypeDeleters: Record<string, (userId: string, calendarId: string) => Promise<boolean>> = {
  ical: deleteIcsSource,
  oauth: deleteOAuthSource,
  caldav: deleteCalDAVSource,
};

export const DELETE = withWideEvent(
  withAuth(async ({ params, userId }) => {
    const { id } = params;

    if (!id) {
      return ErrorResponse.badRequest("ID is required").toResponse();
    }

    const [source] = await database
      .select({ calendarType: calendarsTable.calendarType })
      .from(calendarsTable)
      .where(
        and(
          eq(calendarsTable.id, id),
          eq(calendarsTable.userId, userId),
        ),
      )
      .limit(1);

    if (!source) {
      return ErrorResponse.notFound().toResponse();
    }

    const deleter = calendarTypeDeleters[source.calendarType];

    if (!deleter) {
      return ErrorResponse.badRequest("Unknown source type").toResponse();
    }

    await deleter(userId, id);

    return Response.json({ success: true });
  }),
);
