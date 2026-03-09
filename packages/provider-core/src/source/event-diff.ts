import type { SourceEvent } from "../types";

interface ExistingSourceEventState {
  id: string;
  sourceEventUid: string | null;
  startTime: Date;
  endTime: Date;
}

interface SourceEventDiffOptions {
  isDeltaSync?: boolean;
  cancelledEventUids?: string[];
}

const buildSourceEventIdentityKey = (
  sourceEventUid: string,
  startTime: Date,
  endTime: Date,
): string => `${sourceEventUid}|${startTime.toISOString()}|${endTime.toISOString()}`;

const buildExistingEventIdentitySet = (
  existingEvents: ExistingSourceEventState[],
): Set<string> => {
  const identities = new Set<string>();

  for (const existingEvent of existingEvents) {
    if (existingEvent.sourceEventUid === null) {
      continue;
    }

    identities.add(
      buildSourceEventIdentityKey(
        existingEvent.sourceEventUid,
        existingEvent.startTime,
        existingEvent.endTime,
      ),
    );
  }

  return identities;
};

const buildSourceEventsToAdd = (
  existingEvents: ExistingSourceEventState[],
  incomingEvents: SourceEvent[],
): SourceEvent[] => {
  const existingIdentities = buildExistingEventIdentitySet(existingEvents);

  return incomingEvents.filter(
    (incomingEvent) =>
      !existingIdentities.has(
        buildSourceEventIdentityKey(
          incomingEvent.uid,
          incomingEvent.startTime,
          incomingEvent.endTime,
        ),
      ),
  );
};

const buildSourceEventStateIdsToRemove = (
  existingEvents: ExistingSourceEventState[],
  incomingEvents: SourceEvent[],
  options: SourceEventDiffOptions = {},
): string[] => {
  const { isDeltaSync = false, cancelledEventUids } = options;

  if (isDeltaSync) {
    if (!cancelledEventUids || cancelledEventUids.length === 0) {
      return [];
    }

    const cancelledUidSet = new Set(cancelledEventUids);

    return existingEvents
      .filter(
        (existingEvent) =>
          existingEvent.sourceEventUid !== null
          && cancelledUidSet.has(existingEvent.sourceEventUid),
      )
      .map((existingEvent) => existingEvent.id);
  }

  const incomingIdentitySet = new Set(
    incomingEvents.map((incomingEvent) =>
      buildSourceEventIdentityKey(
        incomingEvent.uid,
        incomingEvent.startTime,
        incomingEvent.endTime,
      )),
  );

  return existingEvents
    .filter((existingEvent) => {
      if (existingEvent.sourceEventUid === null) {
        return false;
      }

      const existingIdentityKey = buildSourceEventIdentityKey(
        existingEvent.sourceEventUid,
        existingEvent.startTime,
        existingEvent.endTime,
      );

      return !incomingIdentitySet.has(existingIdentityKey);
    })
    .map((existingEvent) => existingEvent.id);
};

export {
  buildSourceEventIdentityKey,
  buildSourceEventsToAdd,
  buildSourceEventStateIdsToRemove,
};
export type { ExistingSourceEventState, SourceEventDiffOptions };
