import env from "@keeper.sh/env/database";
import { drizzle } from "drizzle-orm/bun-sql";

export const database = drizzle(env.DATABASE_URL);
