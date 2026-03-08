import { feedbackRequestSchema } from "@keeper.sh/data-schemas";
import { feedbackTable } from "@keeper.sh/database/schema";
import { user as userTable } from "@keeper.sh/database/auth-schema";
import { eq } from "drizzle-orm";
import { withAuth, withWideEvent } from "../../../utils/middleware";
import { ErrorResponse } from "../../../utils/responses";
import { database, resend, feedbackEmail } from "../../../context";

const FEEDBACK_LABEL: Record<string, string> = {
  feedback: "Feedback",
  report: "Problem Report",
};

const POST = withWideEvent(
  withAuth(async ({ request, userId }) => {
    const body = await request.json();

    try {
      const { message, type, wantsFollowUp } = feedbackRequestSchema.assert(body);

      await database.insert(feedbackTable).values({
        message,
        type,
        userId,
        wantsFollowUp: wantsFollowUp ?? false,
      });

      if (resend && feedbackEmail) {
        const [user] = await database
          .select({ email: userTable.email })
          .from(userTable)
          .where(eq(userTable.id, userId))
          .limit(1);

        const label = FEEDBACK_LABEL[type] ?? "Feedback";
        const replyTo = user?.email ?? undefined;

        await resend.emails.send({
          from: "Keeper <noreply@keeper.sh>",
          to: feedbackEmail,
          subject: `[${label}] from ${replyTo ?? "unknown user"}`,
          text: [
            `Type: ${label}`,
            `User: ${replyTo ?? userId}`,
            `Wants follow-up: ${wantsFollowUp ? "Yes" : "No"}`,
            "",
            message,
          ].join("\n"),
          ...(replyTo && { replyTo }),
        });
      }

      return Response.json({ success: true });
    } catch {
      return ErrorResponse.badRequest("Invalid feedback request.").toResponse();
    }
  }),
);

export { POST };
