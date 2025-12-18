import { drizzle } from "drizzle-orm/node-postgres";
import env from "@keeper.sh/env/database";

export const database = drizzle(env.DATABASE_URL);
