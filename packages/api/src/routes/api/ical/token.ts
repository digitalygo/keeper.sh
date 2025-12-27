import { withTracing, withAuth } from "../../../utils/middleware";
import { getUserIdentifierToken } from "../../../utils/user";

export const GET = withTracing(
  withAuth(async ({ userId }) => {
    const token = await getUserIdentifierToken(userId);
    return Response.json({ token });
  }),
);
