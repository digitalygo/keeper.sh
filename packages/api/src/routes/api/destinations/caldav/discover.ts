import { withTracing, withAuth } from "../../../../utils/middleware";
import { discoverCalendars, CalDAVConnectionError } from "../../../../utils/caldav";

export const POST = withTracing(
  withAuth(async ({ request }) => {
    const body = (await request.json()) as {
      serverUrl?: string;
      username?: string;
      password?: string;
    };
    const { serverUrl, username, password } = body;

    if (!serverUrl || !username || !password) {
      return Response.json(
        { error: "Server URL, username, and password are required" },
        { status: 400 },
      );
    }

    try {
      const calendars = await discoverCalendars(serverUrl, { username, password });
      return Response.json({ calendars });
    } catch (error) {
      if (error instanceof CalDAVConnectionError) {
        return Response.json({ error: error.message }, { status: 400 });
      }
      throw error;
    }
  }),
);
