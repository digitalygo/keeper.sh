import type {
  SyncableEvent,
  PushResult,
  DeleteResult,
  SyncResult,
  RemoteEvent,
  ProviderConfig,
} from "./types";
import type { SyncStatus } from "@keeper.sh/data-schemas";
import { generateEventUid, isKeeperEvent } from "./event-identity";
import { log } from "@keeper.sh/log";
import { emit } from "@keeper.sh/broadcast";
import { database } from "@keeper.sh/database";
import { syncStatusTable } from "@keeper.sh/database/schema";

export abstract class CalendarProvider<TConfig extends ProviderConfig = ProviderConfig> {
  abstract readonly name: string;
  abstract readonly id: string;

  protected readonly childLog = log.child({ provider: this.constructor.name });

  constructor(protected config: TConfig) {}

  abstract pushEvents(events: SyncableEvent[]): Promise<PushResult[]>;
  abstract deleteEvents(eventIds: string[]): Promise<DeleteResult[]>;
  abstract listRemoteEvents(): Promise<RemoteEvent[]>;

  async sync(localEvents: SyncableEvent[]): Promise<SyncResult> {
    const { userId } = this.config;

    this.childLog.debug(
      { userId, localCount: localEvents.length },
      "starting sync",
    );

    this.emitStatus({
      status: "syncing",
      stage: "fetching",
      localEventCount: localEvents.length,
      remoteEventCount: 0,
      inSync: false,
    });

    const remoteEvents = await this.listRemoteEvents();

    this.emitStatus({
      status: "syncing",
      stage: "comparing",
      localEventCount: localEvents.length,
      remoteEventCount: remoteEvents.length,
      inSync: false,
    });

    const { toAdd, toRemove } = this.diffEvents(localEvents, remoteEvents);

    this.childLog.debug(
      { userId, toAddCount: toAdd.length, toRemoveCount: toRemove.length },
      "diff complete",
    );

    const inSync = toAdd.length === 0 && toRemove.length === 0;

    if (inSync) {
      this.childLog.debug({ userId }, "destination in sync");
      await this.persistAndEmitFinalStatus(localEvents.length, remoteEvents.length);
      return { added: 0, removed: 0 };
    }

    if (toAdd.length > 0) {
      this.emitStatus({
        status: "syncing",
        stage: "pushing",
        localEventCount: localEvents.length,
        remoteEventCount: remoteEvents.length,
        progress: { current: 0, total: toAdd.length },
        inSync: false,
      });
      await this.pushEvents(toAdd);
    }

    if (toRemove.length > 0) {
      this.emitStatus({
        status: "syncing",
        stage: "deleting",
        localEventCount: localEvents.length,
        remoteEventCount: remoteEvents.length,
        progress: { current: 0, total: toRemove.length },
        inSync: false,
      });
      await this.deleteEvents(toRemove);
    }

    const finalRemoteCount = remoteEvents.length + toAdd.length - toRemove.length;
    await this.persistAndEmitFinalStatus(localEvents.length, finalRemoteCount);

    this.childLog.info(
      { userId, added: toAdd.length, removed: toRemove.length },
      "sync complete",
    );

    return { added: toAdd.length, removed: toRemove.length };
  }

  private emitStatus(status: Omit<SyncStatus, "provider">): void {
    emit(this.config.userId, "sync:status", {
      provider: this.id,
      ...status,
    });
  }

  private async persistAndEmitFinalStatus(
    localEventCount: number,
    remoteEventCount: number,
  ): Promise<void> {
    const { userId } = this.config;
    const now = new Date();

    await database
      .insert(syncStatusTable)
      .values({
        userId,
        provider: this.id,
        localEventCount,
        remoteEventCount,
        lastSyncedAt: now,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: [syncStatusTable.userId, syncStatusTable.provider],
        set: {
          localEventCount,
          remoteEventCount,
          lastSyncedAt: now,
          updatedAt: now,
        },
      });

    this.emitStatus({
      status: "idle",
      localEventCount,
      remoteEventCount,
      lastSyncedAt: now.toISOString(),
      inSync: true,
    });
  }

  private diffEvents(
    localEvents: SyncableEvent[],
    remoteEvents: RemoteEvent[],
  ): { toAdd: SyncableEvent[]; toRemove: string[] } {
    const remoteUidSet = new Set<string>();
    for (const event of remoteEvents) {
      remoteUidSet.add(event.uid);
    }

    const localUidToEvent = new Map<string, SyncableEvent>();
    for (const event of localEvents) {
      const uid = this.generateUid(event);
      localUidToEvent.set(uid, event);
    }

    const toAdd: SyncableEvent[] = [];
    const toRemove: string[] = [];

    for (const [uid, event] of localUidToEvent) {
      if (!remoteUidSet.has(uid)) {
        toAdd.push(event);
      }
    }

    for (const uid of remoteUidSet) {
      if (!localUidToEvent.has(uid)) {
        toRemove.push(uid);
      }
    }

    return { toAdd, toRemove };
  }

  protected generateUid(event: SyncableEvent): string {
    return generateEventUid(this.config.userId, event);
  }

  protected isKeeperEvent(uid: string): boolean {
    return isKeeperEvent(uid);
  }
}
