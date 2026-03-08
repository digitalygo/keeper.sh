import { createHash } from "node:crypto";
import type { SyncableEvent } from "../types";

type SyncableEventContent = Pick<SyncableEvent, "summary" | "description" | "location">;

const normalizeText = (value?: string): string => value?.trim() ?? "";

const createSyncEventContentHash = (event: SyncableEventContent): string => {
  const payload = JSON.stringify([
    normalizeText(event.summary),
    normalizeText(event.description),
    normalizeText(event.location),
  ]);

  return createHash("sha256").update(payload).digest("hex");
};

export { createSyncEventContentHash };
export type { SyncableEventContent };
