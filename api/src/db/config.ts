import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { Database } from "@/api/types";
import dotenv from "dotenv";
dotenv.config();

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
});

export default db;
