import { withTracing, withAuth } from "../../../utils/middleware";
import { deleteCalendarDestination } from "../../../utils/destinations";

export const DELETE = withTracing(
  withAuth(async ({ params, userId }) => {
    const { id } = params;

    if (!id) {
      return Response.json(
        { error: "Destination ID is required" },
        { status: 400 },
      );
    }

    const deleted = await deleteCalendarDestination(userId, id);

    if (!deleted) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json({ success: true });
  }),
);
