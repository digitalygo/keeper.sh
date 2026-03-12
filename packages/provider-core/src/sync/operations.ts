import type { EventMapping } from "../events/mappings";
import type { RemoteEvent, SyncOperation } from "../types";
import { getOAuthSyncWindowStart } from "../oauth/sync-window";

interface RemoveOperationTimeBoundary {
  now: Date;
  syncWindowStart: Date;
}

const getDefaultTimeBoundary = (): RemoveOperationTimeBoundary => ({
  now: new Date(),
  syncWindowStart: getOAuthSyncWindowStart(),
});

const buildRemoveOperations = (
  existingMappings: EventMapping[],
  remoteEvents: RemoteEvent[],
  localEventIds: Set<string>,
  mappedDestinationUids: Set<string>,
  timeBoundary: RemoveOperationTimeBoundary = getDefaultTimeBoundary(),
): SyncOperation[] => {
  const operations: SyncOperation[] = [];

  for (const mapping of existingMappings) {
    if (mapping.startTime < timeBoundary.syncWindowStart) {
      continue;
    }

    if (!localEventIds.has(mapping.eventStateId)) {
      operations.push({
        deleteId: mapping.deleteIdentifier,
        startTime: mapping.startTime,
        type: "remove",
        uid: mapping.destinationEventUid,
      });
    }
  }

  for (const remoteEvent of remoteEvents) {
    if (mappedDestinationUids.has(remoteEvent.uid)) {
      continue;
    }

    const isOrphanedKeeperEvent = remoteEvent.isKeeperEvent;
    const isPastEvent = remoteEvent.startTime <= timeBoundary.now;

    if (!isOrphanedKeeperEvent && !isPastEvent) {
      continue;
    }

    operations.push({
      deleteId: remoteEvent.deleteId,
      startTime: remoteEvent.startTime,
      type: "remove",
      uid: remoteEvent.uid,
    });
  }

  return operations;
};

export { buildRemoveOperations };
export type { RemoveOperationTimeBoundary };
