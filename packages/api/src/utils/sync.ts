import { syncDestinationsForUser } from "@keeper.sh/integrations";
import { destinationProviders } from "@keeper.sh/destination-providers";
import { log } from "@keeper.sh/log";

/**
 * Triggers a background sync for all destinations of a user.
 * Fire-and-forget with error logging - does not throw.
 */
export const triggerDestinationSync = (userId: string): void => {
  syncDestinationsForUser(userId, destinationProviders).catch((error) => {
    log.error({ userId, error }, "background destination sync failed");
  });
};
