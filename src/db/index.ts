import dotenv from "dotenv";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "#/db/schema";
import { Pool } from "pg";

dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!
});

export const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema });
