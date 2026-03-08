import { Resend } from "resend";
import env from "@keeper.sh/env/api";
import { createDatabase } from "@keeper.sh/database";
import { syncStatusTable } from "@keeper.sh/database/schema";
import { createRedis } from "@keeper.sh/redis";
import { createAuth } from "@keeper.sh/auth";
import { createBroadcastService } from "@keeper.sh/broadcast";
import { createPremiumService } from "@keeper.sh/premium";
import { SYNC_TTL_SECONDS } from "@keeper.sh/constants";
import {
  createSyncCoordinator,
  createOAuthProviders,
  buildOAuthConfigs,
  SyncAggregateTracker,
} from "@keeper.sh/provider-core";
import { createDestinationProviders } from "@keeper.sh/provider-registry/server";
import type { DestinationSyncResult, SyncProgressUpdate, SyncAggregateMessage } from "@keeper.sh/provider-core";

const INITIAL_EVENT_COUNT = 0;
const MIN_TRUSTED_ORIGINS_COUNT = 0;
const SYNC_AGGREGATE_LATEST_KEY_PREFIX = "sync:aggregate:latest:";
const SYNC_AGGREGATE_SEQUENCE_KEY_PREFIX = "sync:aggregate:seq:";

const database = createDatabase(env.DATABASE_URL);
const redis = createRedis(env.REDIS_URL);

const parseTrustedOrigins = (origins?: string): string[] => {
  if (!origins) {
    return [];
  }
  return origins.split(",").map((origin): string => origin.trim());
};

const trustedOrigins = parseTrustedOrigins(env.TRUSTED_ORIGINS);

const { auth } = createAuth({
  database,
  secret: env.BETTER_AUTH_SECRET,
  baseUrl: env.BETTER_AUTH_URL,
  webBaseUrl: env.BETTER_AUTH_URL,
  commercialMode: env.COMMERCIAL_MODE ?? false,
  polarAccessToken: env.POLAR_ACCESS_TOKEN,
  polarMode: env.POLAR_MODE,
  googleClientId: env.GOOGLE_CLIENT_ID,
  googleClientSecret: env.GOOGLE_CLIENT_SECRET,
  resendApiKey: env.RESEND_API_KEY,
  passkeyRpId: env.PASSKEY_RP_ID,
  passkeyRpName: env.PASSKEY_RP_NAME,
  passkeyOrigin: env.PASSKEY_ORIGIN,
  ...(trustedOrigins.length > MIN_TRUSTED_ORIGINS_COUNT && { trustedOrigins }),
});

const broadcastService = createBroadcastService({ redis });

const premiumService = createPremiumService({
  commercialMode: env.COMMERCIAL_MODE ?? false,
  database,
});

const oauthConfigs = buildOAuthConfigs(env);
const oauthProviders = createOAuthProviders(oauthConfigs);

const broadcastSyncStatus = (
  userId: string,
  calendarId: string,
  data: { needsReauthentication: boolean },
): void => {
  broadcastService.emit(userId, "sync:status", {
    calendarId,
    inSync: false,
    localEventCount: INITIAL_EVENT_COUNT,
    needsReauthentication: data.needsReauthentication,
    remoteEventCount: INITIAL_EVENT_COUNT,
    status: "idle",
  });
};

const destinationProviders = createDestinationProviders({
  broadcastSyncStatus,
  database,
  encryptionKey: env.ENCRYPTION_KEY,
  oauthProviders,
});

const syncAggregateTracker = new SyncAggregateTracker();

const getSyncAggregateLatestKey = (userId: string): string =>
  `${SYNC_AGGREGATE_LATEST_KEY_PREFIX}${userId}`;

const getSyncAggregateSequenceKey = (userId: string): string =>
  `${SYNC_AGGREGATE_SEQUENCE_KEY_PREFIX}${userId}`;

const emitSyncAggregate = async (
  userId: string,
  aggregate: SyncAggregateMessage,
): Promise<void> => {
  try {
    const sequenceKey = getSyncAggregateSequenceKey(userId);
    const seq = await redis.incr(sequenceKey);
    await redis.expire(sequenceKey, SYNC_TTL_SECONDS);

    const payload: SyncAggregateMessage = { ...aggregate, seq };

    const latestKey = getSyncAggregateLatestKey(userId);
    await redis.set(latestKey, JSON.stringify(payload));
    await redis.expire(latestKey, SYNC_TTL_SECONDS);

    broadcastService.emit(userId, "sync:aggregate", payload);
  } catch {
    broadcastService.emit(userId, "sync:aggregate", aggregate);
  }
};

const onDestinationSync = async (result: DestinationSyncResult): Promise<void> => {
  if (result.broadcast === false) {
    return;
  }

  const now = new Date();
  const lastSyncedAt = now.toISOString();

  await database
    .insert(syncStatusTable)
    .values({
      calendarId: result.calendarId,
      lastSyncedAt: now,
      localEventCount: result.localEventCount,
      remoteEventCount: result.remoteEventCount,
    })
    .onConflictDoUpdate({
      set: {
        lastSyncedAt: now,
        localEventCount: result.localEventCount,
        remoteEventCount: result.remoteEventCount,
      },
      target: [syncStatusTable.calendarId],
    });

  const aggregate = syncAggregateTracker.trackDestinationSync(result, lastSyncedAt);
  if (aggregate) {
    await emitSyncAggregate(result.userId, aggregate);
  }
};

const onSyncProgress = (update: SyncProgressUpdate): void => {
  const aggregate = syncAggregateTracker.trackProgress(update);
  if (!aggregate) return;
  void emitSyncAggregate(update.userId, aggregate);
};

const getCurrentSyncAggregate = (
  userId: string,
  fallback: {
    progressPercent: number;
    syncEventsProcessed: number;
    syncEventsRemaining: number;
    syncEventsTotal: number;
    lastSyncedAt: string | null;
  },
) => syncAggregateTracker.getCurrentAggregate(userId, fallback);

const getCachedSyncAggregate = async (userId: string): Promise<SyncAggregateMessage | null> => {
  const value = await redis.get(getSyncAggregateLatestKey(userId));
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as SyncAggregateMessage;
  } catch {
    return null;
  }
};

const syncCoordinator = createSyncCoordinator({
  onDestinationSync,
  onSyncProgress,
  redis,
});

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;
const feedbackEmail = env.FEEDBACK_EMAIL ?? null;

const baseUrl = env.BETTER_AUTH_URL;
const encryptionKey = env.ENCRYPTION_KEY;

export {
  database,
  redis,
  env,
  trustedOrigins,
  auth,
  broadcastService,
  premiumService,
  oauthProviders,
  destinationProviders,
  syncCoordinator,
  resend,
  feedbackEmail,
  baseUrl,
  encryptionKey,
  getCurrentSyncAggregate,
  getCachedSyncAggregate,
};
