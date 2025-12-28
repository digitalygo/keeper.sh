import { log } from "@keeper.sh/log";
import type { RedisClient } from "bun";

const SYNC_KEY_PREFIX = "sync:generation:";
const SYNC_TTL_SECONDS = 86400;

const getSyncKey = (userId: string): string => `${SYNC_KEY_PREFIX}${userId}`;

export interface DestinationSyncResult {
  userId: string;
  destinationId: string;
  localEventCount: number;
  remoteEventCount: number;
}

export interface SyncContext {
  userId: string;
  generation: number;
  onDestinationSync?: (result: DestinationSyncResult) => Promise<void>;
}

export interface SyncCoordinatorConfig {
  redis: RedisClient;
  onDestinationSync?: (result: DestinationSyncResult) => Promise<void>;
}

export interface SyncCoordinator {
  startSync: (userId: string) => Promise<SyncContext>;
  isSyncCurrent: (context: SyncContext) => Promise<boolean>;
  endSync: (context: SyncContext) => Promise<void>;
}

export const createSyncCoordinator = (config: SyncCoordinatorConfig): SyncCoordinator => {
  const { redis, onDestinationSync } = config;

  const startSync = async (userId: string): Promise<SyncContext> => {
    const key = getSyncKey(userId);
    const generation = await redis.incr(key);
    await redis.expire(key, SYNC_TTL_SECONDS);

    log.debug({ userId, generation }, "starting sync generation");

    return { userId, generation, onDestinationSync };
  };

  const isSyncCurrent = async (context: SyncContext): Promise<boolean> => {
    const key = getSyncKey(context.userId);
    const currentGeneration = await redis.get(key);

    if (currentGeneration === null) {
      return false;
    }

    return parseInt(currentGeneration, 10) === context.generation;
  };

  const endSync = async (context: SyncContext): Promise<void> => {
    log.debug({ userId: context.userId, generation: context.generation }, "ending sync generation");
  };

  return { startSync, isSyncCurrent, endSync };
};
