import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

export const db = new Client({
  connectionString: process.env.DATABASE_URL,
});

export const connectToDB = async () => {
  let retries = 5;
  while (retries) {
    console.log("Connecting to the database... remaining attempts:", retries);
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
