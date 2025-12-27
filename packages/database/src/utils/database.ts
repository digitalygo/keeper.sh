import env from "@keeper.sh/env/database";
import { log } from "@keeper.sh/log";
import { drizzle } from "drizzle-orm/bun-sql";

if (!env.DATABASE_URL) {
  log.warn("DATABASE_URL is not set, will default to an empty string");
}

export const database = drizzle(env.DATABASE_URL ?? "");
