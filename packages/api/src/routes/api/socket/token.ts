import { withTracing, withAuth } from "../../../utils/middleware";
import { socketTokens } from "../../../utils/state";

const TOKEN_TTL = 30_000;

const generateSocketToken = (userId: string): string => {
  const token = crypto.randomUUID();
  const timeout = setTimeout(() => socketTokens.delete(token), TOKEN_TTL);
  socketTokens.set(token, { userId, timeout });
  return token;
};

export const GET = withTracing(
  withAuth(async ({ userId }) => {
    const token = generateSocketToken(userId);
    return Response.json({ token });
  }),
);
