-- Phase 1: Create new tables
CREATE TABLE "calendar_accounts" (
	"accountId" text,
	"authType" text NOT NULL,
	"caldavCredentialId" uuid,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"email" text,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"needsReauthentication" boolean DEFAULT false NOT NULL,
	"oauthCredentialId" uuid,
	"provider" text NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "calendars" (
	"accountId" uuid NOT NULL,
	"calendarType" text NOT NULL,
	"calendarUrl" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"excludeFocusTime" boolean DEFAULT false NOT NULL,
	"excludeOutOfOffice" boolean DEFAULT false NOT NULL,
	"excludeWorkingLocation" boolean DEFAULT false NOT NULL,
	"externalCalendarId" text,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"role" text NOT NULL,
	"syncToken" text,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"url" text,
	"userId" text NOT NULL
);
--> statement-breakpoint
-- Phase 2: Add new columns to oauth_credentials (temporarily nullable for provider/userId)
ALTER TABLE "oauth_credentials" ADD COLUMN "email" text;--> statement-breakpoint
ALTER TABLE "oauth_credentials" ADD COLUMN "needsReauthentication" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "oauth_credentials" ADD COLUMN "provider" text;--> statement-breakpoint
ALTER TABLE "oauth_credentials" ADD COLUMN "userId" text;
--> statement-breakpoint
-- Phase 3: Populate oauth_credentials new columns from calendar_destinations
UPDATE "oauth_credentials" oc
SET "provider" = cd."provider", "userId" = cd."userId", "email" = cd."email"
FROM "calendar_destinations" cd
WHERE cd."oauthCredentialId" = oc."id";
--> statement-breakpoint
-- Phase 4: Merge oauth_source_credentials into oauth_credentials
INSERT INTO "oauth_credentials" ("id", "accessToken", "refreshToken", "expiresAt", "email", "needsReauthentication", "provider", "userId", "createdAt", "updatedAt")
SELECT "id", "accessToken", "refreshToken", "expiresAt", "email", "needsReauthentication", "provider", "userId", "createdAt", "updatedAt"
FROM "oauth_source_credentials"
ON CONFLICT ("id") DO NOTHING;
--> statement-breakpoint
-- Phase 5: Make columns NOT NULL (all rows should be populated now)
ALTER TABLE "oauth_credentials" ALTER COLUMN "provider" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "oauth_credentials" ALTER COLUMN "userId" SET NOT NULL;
--> statement-breakpoint
-- Phase 6: Data migration — create calendar_accounts + calendars from OAuth destinations
-- Use calendar_destinations.id as calendars.id so all existing FKs resolve automatically
WITH dest_accounts AS (
  INSERT INTO "calendar_accounts" ("id", "userId", "provider", "authType", "accountId", "email", "oauthCredentialId", "needsReauthentication", "createdAt", "updatedAt")
  SELECT gen_random_uuid(), "userId", "provider", 'oauth', "accountId", "email", "oauthCredentialId", "needsReauthentication", "createdAt", "updatedAt"
  FROM "calendar_destinations"
  WHERE "oauthCredentialId" IS NOT NULL
  RETURNING "id" AS account_id, "userId", "provider", "accountId"
)
INSERT INTO "calendars" ("id", "accountId", "calendarType", "name", "role", "userId", "createdAt", "updatedAt")
SELECT cd."id", da.account_id, 'oauth', cd."provider" || ' destination', 'destination', cd."userId", cd."createdAt", cd."updatedAt"
FROM "calendar_destinations" cd
JOIN dest_accounts da ON da."userId" = cd."userId" AND da."provider" = cd."provider" AND da."accountId" = cd."accountId"
WHERE cd."oauthCredentialId" IS NOT NULL;
--> statement-breakpoint
-- Phase 7: Data migration — create calendar_accounts + calendars from CalDAV destinations
WITH caldav_dest_accounts AS (
  INSERT INTO "calendar_accounts" ("id", "userId", "provider", "authType", "accountId", "email", "caldavCredentialId", "needsReauthentication", "createdAt", "updatedAt")
  SELECT gen_random_uuid(), "userId", "provider", 'caldav', "accountId", "email", "caldavCredentialId", "needsReauthentication", "createdAt", "updatedAt"
  FROM "calendar_destinations"
  WHERE "caldavCredentialId" IS NOT NULL
  RETURNING "id" AS account_id, "userId", "provider", "accountId"
)
INSERT INTO "calendars" ("id", "accountId", "calendarType", "calendarUrl", "name", "role", "userId", "createdAt", "updatedAt")
SELECT cd."id", cda.account_id, 'caldav', cred."calendarUrl", cd."provider" || ' destination', 'destination', cd."userId", cd."createdAt", cd."updatedAt"
FROM "calendar_destinations" cd
JOIN caldav_dest_accounts cda ON cda."userId" = cd."userId" AND cda."provider" = cd."provider" AND cda."accountId" = cd."accountId"
LEFT JOIN "caldav_credentials" cred ON cd."caldavCredentialId" = cred."id"
WHERE cd."caldavCredentialId" IS NOT NULL;
--> statement-breakpoint
-- Phase 8: Data migration — create calendar_accounts + calendars from OAuth sources
WITH oauth_src_accounts AS (
  INSERT INTO "calendar_accounts" ("id", "userId", "provider", "authType", "oauthCredentialId", "createdAt", "updatedAt")
  SELECT gen_random_uuid(), cs."userId", COALESCE(cs."provider", 'unknown'), 'oauth', cs."oauthCredentialId", cs."createdAt", cs."updatedAt"
  FROM "calendar_sources" cs
  WHERE cs."sourceType" = 'oauth' AND cs."oauthCredentialId" IS NOT NULL
  RETURNING "id" AS account_id, "userId", "oauthCredentialId"
)
INSERT INTO "calendars" ("id", "accountId", "calendarType", "externalCalendarId", "name", "role", "syncToken", "excludeFocusTime", "excludeOutOfOffice", "excludeWorkingLocation", "userId", "createdAt", "updatedAt")
SELECT cs."id", osa.account_id, 'oauth', cs."externalCalendarId", cs."name", 'source', cs."syncToken", cs."excludeFocusTime", cs."excludeOutOfOffice", cs."excludeWorkingLocation", cs."userId", cs."createdAt", cs."updatedAt"
FROM "calendar_sources" cs
JOIN oauth_src_accounts osa ON osa."userId" = cs."userId" AND osa."oauthCredentialId" = cs."oauthCredentialId"
WHERE cs."sourceType" = 'oauth' AND cs."oauthCredentialId" IS NOT NULL;
--> statement-breakpoint
-- Phase 9: Data migration — create calendar_accounts + calendars from CalDAV sources
WITH caldav_src_accounts AS (
  INSERT INTO "calendar_accounts" ("id", "userId", "provider", "authType", "caldavCredentialId", "createdAt", "updatedAt")
  SELECT gen_random_uuid(), cs."userId", COALESCE(cs."provider", 'caldav'), 'caldav', cs."caldavCredentialId", cs."createdAt", cs."updatedAt"
  FROM "calendar_sources" cs
  WHERE cs."sourceType" = 'caldav' AND cs."caldavCredentialId" IS NOT NULL
  RETURNING "id" AS account_id, "userId", "caldavCredentialId"
)
INSERT INTO "calendars" ("id", "accountId", "calendarType", "calendarUrl", "name", "role", "syncToken", "userId", "createdAt", "updatedAt")
SELECT cs."id", csa.account_id, 'caldav', cs."calendarUrl", cs."name", 'source', cs."syncToken", cs."userId", cs."createdAt", cs."updatedAt"
FROM "calendar_sources" cs
JOIN caldav_src_accounts csa ON csa."userId" = cs."userId" AND csa."caldavCredentialId" = cs."caldavCredentialId"
WHERE cs."sourceType" = 'caldav' AND cs."caldavCredentialId" IS NOT NULL;
--> statement-breakpoint
-- Phase 10: Data migration — create calendar_accounts + calendars from ICS sources
WITH ics_accounts AS (
  INSERT INTO "calendar_accounts" ("id", "userId", "provider", "authType", "createdAt", "updatedAt")
  SELECT gen_random_uuid(), "userId", 'ics', 'none', "createdAt", "updatedAt"
  FROM "calendar_sources"
  WHERE "sourceType" = 'ical'
  RETURNING "id" AS account_id, "userId", "createdAt"
)
INSERT INTO "calendars" ("id", "accountId", "calendarType", "name", "role", "url", "syncToken", "userId", "createdAt", "updatedAt")
SELECT cs."id", ia.account_id, 'ical', cs."name", 'source', cs."url", cs."syncToken", cs."userId", cs."createdAt", cs."updatedAt"
FROM "calendar_sources" cs
JOIN ics_accounts ia ON ia."userId" = cs."userId" AND ia."createdAt" = cs."createdAt"
WHERE cs."sourceType" = 'ical';
--> statement-breakpoint
-- Phase 11: Drop old FK constraints
ALTER TABLE "calendar_snapshots" DROP CONSTRAINT IF EXISTS "calendar_snapshots_sourceId_calendar_sources_id_fk";
--> statement-breakpoint
ALTER TABLE "event_mappings" DROP CONSTRAINT IF EXISTS "event_mappings_destinationId_calendar_destinations_id_fk";
--> statement-breakpoint
ALTER TABLE "event_states" DROP CONSTRAINT IF EXISTS "event_states_sourceId_calendar_sources_id_fk";
--> statement-breakpoint
ALTER TABLE "source_destination_mappings" DROP CONSTRAINT IF EXISTS "source_destination_mappings_destinationId_calendar_destinations_id_fk";
--> statement-breakpoint
ALTER TABLE "source_destination_mappings" DROP CONSTRAINT IF EXISTS "source_destination_mappings_sourceId_calendar_sources_id_fk";
--> statement-breakpoint
ALTER TABLE "sync_status" DROP CONSTRAINT IF EXISTS "sync_status_destinationId_calendar_destinations_id_fk";
--> statement-breakpoint
-- Phase 12: Rename FK columns
ALTER TABLE "calendar_snapshots" RENAME COLUMN "sourceId" TO "calendarId";--> statement-breakpoint
ALTER TABLE "event_mappings" RENAME COLUMN "destinationId" TO "calendarId";--> statement-breakpoint
ALTER TABLE "event_states" RENAME COLUMN "sourceId" TO "calendarId";--> statement-breakpoint
ALTER TABLE "source_destination_mappings" RENAME COLUMN "destinationId" TO "destinationCalendarId";--> statement-breakpoint
ALTER TABLE "source_destination_mappings" RENAME COLUMN "sourceId" TO "sourceCalendarId";--> statement-breakpoint
ALTER TABLE "sync_status" RENAME COLUMN "destinationId" TO "calendarId";
--> statement-breakpoint
-- Phase 13: Drop old indexes
DROP INDEX IF EXISTS "event_mappings_event_dest_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "event_mappings_destination_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "event_states_source_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "sync_status_destination_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "event_states_identity_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "source_destination_mapping_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "source_destination_mappings_source_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "source_destination_mappings_destination_idx";
--> statement-breakpoint
-- Phase 14: Drop old tables
ALTER TABLE "caldav_source_credentials" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "calendar_destinations" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "calendar_sources" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "oauth_source_credentials" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "caldav_source_credentials" CASCADE;--> statement-breakpoint
DROP TABLE "calendar_destinations" CASCADE;--> statement-breakpoint
DROP TABLE "calendar_sources" CASCADE;--> statement-breakpoint
DROP TABLE "oauth_source_credentials" CASCADE;
--> statement-breakpoint
-- Phase 15: Add new FK constraints
ALTER TABLE "calendar_accounts" ADD CONSTRAINT "calendar_accounts_caldavCredentialId_caldav_credentials_id_fk" FOREIGN KEY ("caldavCredentialId") REFERENCES "public"."caldav_credentials"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "calendar_accounts" ADD CONSTRAINT "calendar_accounts_oauthCredentialId_oauth_credentials_id_fk" FOREIGN KEY ("oauthCredentialId") REFERENCES "public"."oauth_credentials"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "calendar_accounts" ADD CONSTRAINT "calendar_accounts_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "calendars" ADD CONSTRAINT "calendars_accountId_calendar_accounts_id_fk" FOREIGN KEY ("accountId") REFERENCES "public"."calendar_accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "calendars" ADD CONSTRAINT "calendars_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "calendar_snapshots" ADD CONSTRAINT "calendar_snapshots_calendarId_calendars_id_fk" FOREIGN KEY ("calendarId") REFERENCES "public"."calendars"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_mappings" ADD CONSTRAINT "event_mappings_calendarId_calendars_id_fk" FOREIGN KEY ("calendarId") REFERENCES "public"."calendars"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_states" ADD CONSTRAINT "event_states_calendarId_calendars_id_fk" FOREIGN KEY ("calendarId") REFERENCES "public"."calendars"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oauth_credentials" ADD CONSTRAINT "oauth_credentials_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "source_destination_mappings" ADD CONSTRAINT "source_destination_mappings_destinationCalendarId_calendars_id_fk" FOREIGN KEY ("destinationCalendarId") REFERENCES "public"."calendars"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "source_destination_mappings" ADD CONSTRAINT "source_destination_mappings_sourceCalendarId_calendars_id_fk" FOREIGN KEY ("sourceCalendarId") REFERENCES "public"."calendars"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sync_status" ADD CONSTRAINT "sync_status_calendarId_calendars_id_fk" FOREIGN KEY ("calendarId") REFERENCES "public"."calendars"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
-- Phase 16: Create new indexes
CREATE INDEX "calendar_accounts_user_idx" ON "calendar_accounts" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "calendar_accounts_provider_idx" ON "calendar_accounts" USING btree ("provider");--> statement-breakpoint
CREATE INDEX "calendars_user_idx" ON "calendars" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "calendars_account_idx" ON "calendars" USING btree ("accountId");--> statement-breakpoint
CREATE INDEX "calendars_role_idx" ON "calendars" USING btree ("role");--> statement-breakpoint
CREATE INDEX "calendars_type_idx" ON "calendars" USING btree ("calendarType");--> statement-breakpoint
CREATE UNIQUE INDEX "event_mappings_event_cal_idx" ON "event_mappings" USING btree ("eventStateId","calendarId");--> statement-breakpoint
CREATE INDEX "event_mappings_calendar_idx" ON "event_mappings" USING btree ("calendarId");--> statement-breakpoint
CREATE INDEX "event_states_calendar_idx" ON "event_states" USING btree ("calendarId");--> statement-breakpoint
CREATE INDEX "oauth_credentials_user_idx" ON "oauth_credentials" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "oauth_credentials_provider_idx" ON "oauth_credentials" USING btree ("provider");--> statement-breakpoint
CREATE UNIQUE INDEX "sync_status_calendar_idx" ON "sync_status" USING btree ("calendarId");--> statement-breakpoint
CREATE UNIQUE INDEX "event_states_identity_idx" ON "event_states" USING btree ("calendarId","sourceEventUid","startTime","endTime");--> statement-breakpoint
CREATE UNIQUE INDEX "source_destination_mapping_idx" ON "source_destination_mappings" USING btree ("sourceCalendarId","destinationCalendarId");--> statement-breakpoint
CREATE INDEX "source_destination_mappings_source_idx" ON "source_destination_mappings" USING btree ("sourceCalendarId");--> statement-breakpoint
CREATE INDEX "source_destination_mappings_destination_idx" ON "source_destination_mappings" USING btree ("destinationCalendarId");
--> statement-breakpoint
-- Phase 17: Drop calendarUrl from caldav_credentials (now lives on calendars table)
ALTER TABLE "caldav_credentials" DROP COLUMN "calendarUrl";
