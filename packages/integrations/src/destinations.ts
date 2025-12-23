import type { SyncResult } from "./types";
import { log } from "@keeper.sh/log";
import { startSync, endSync, isSyncCurrent, type SyncContext } from "./sync-coordinator";

export interface DestinationProvider {
  syncForUser(userId: string, context: SyncContext): Promise<SyncResult | null>;
}

const providers: DestinationProvider[] = [];

export function registerDestinationProvider(
  provider: DestinationProvider,
): void {
  providers.push(provider);
}

export async function syncDestinationsForUser(userId: string): Promise<void> {
  const context = await startSync(userId);

  try {
    const results = await Promise.allSettled(
      providers.map((provider) => provider.syncForUser(userId, context)),
    );

    const isCurrent = await isSyncCurrent(context);

    for (const result of results) {
      if (result.status === "rejected" && isCurrent) {
        log.error(result.reason, "destination sync failed for user '%s'", userId);
      }
    }
  } finally {
    await endSync(context);
  }
}
