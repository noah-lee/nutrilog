import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

export const db = new Client({
  connectionString: process.env.DATABASE_URL,
});

export const dbConnect = async () => {
  let retries = 5;
  while (retries) {
    try {
      await db.connect();
      return;
    } catch {
      retries -= 1;
      await new Promise((resolve) => setTimeout(resolve, 5000)); // wait for 5 seconds before retrying
    }
  }
  throw new Error("Could not connect to the database after multiple attempts");
};
