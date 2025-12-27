import { withTracing, withAuth } from "../../../utils/middleware";
import { deleteSource } from "../../../utils/sources";

export const DELETE = withTracing(
  withAuth(async ({ params, userId }) => {
    const { id } = params;

    if (!id) {
      return Response.json({ error: "ID is required" }, { status: 400 });
    }

    const deleted = await deleteSource(userId, id);

    if (!deleted) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json({ success: true });
  }),
);
