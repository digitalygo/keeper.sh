import { auth } from "@keeper.sh/auth";
import { database } from "@keeper.sh/database";
import { calendarSnapshotsTable } from "@keeper.sh/database/schema";
import { log } from "@keeper.sh/log";
import { BunRequest } from "bun";
import { eq, and } from "drizzle-orm";

type BunRouteCallback = (request: BunRequest<string>) => Promise<Response>;

const ALLOWED_ORIGINS = [
  "http://localhost:3001",
  "http://127.0.0.1:3001",
];

const corsHeaders = (origin: string | null) => {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };

  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  return headers;
};

const withCors = (response: Response, origin: string | null): Response => {
  const headers = corsHeaders(origin);
  for (const [key, value] of Object.entries(headers)) {
    response.headers.set(key, value);
  }
  return response;
};

const withTracing = (callback: BunRouteCallback): BunRouteCallback => {
  return async (request) => {
    const url = request.url;
    log.trace("request to %s started", url);
    const result = await callback(request);
    log.trace("request to %s complete", url);
    return result;
  };
};

const server = Bun.serve({
  port: 3000,
  routes: {
    "/api/auth/*": async (request) => {
      const origin = request.headers.get("Origin");

      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: corsHeaders(origin),
        });
      }

      const response = await auth.handler(request);
      return withCors(response, origin);
    },
    "/users/:userId/snapshots": withTracing(async (request) => {
      const { userId } = request.params;

      if (!userId) {
        return new Response(null, { status: 404 });
      }

      const snapshots = await database
        .select({ id: calendarSnapshotsTable.id })
        .from(calendarSnapshotsTable)
        .where(
          and(
            eq(calendarSnapshotsTable.userId, userId),
            eq(calendarSnapshotsTable.public, true),
          ),
        );

      const snapshotIds = snapshots.map(({ id }) => id);
      return Response.json(snapshotIds);
    }),
    "/snapshots/:id": withTracing(async (request) => {
      const id = request.params.id?.replace(/\.ics$/, "");

      if (!id) {
        return new Response(null, { status: 404 });
      }

      const [snapshot] = await database
        .select()
        .from(calendarSnapshotsTable)
        .where(
          and(
            eq(calendarSnapshotsTable.id, id),
            eq(calendarSnapshotsTable.public, true),
          ),
        )
        .limit(1);

      if (!snapshot?.ical) {
        return new Response(null, { status: 404 });
      }

      return new Response(snapshot.ical, {
        headers: { "Content-Type": "text/calendar" },
      });
    }),
  },
});

log.info({ port: server.port }, "server started");
