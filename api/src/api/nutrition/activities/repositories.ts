import db from "@/db/config";
import { ActivityLogInsert } from "@/api/nutrition/activities/types";

export const addActivityLogs = async (logs: ActivityLogInsert[]) => {
  if (logs.length === 0) {
    return [];
  }
  return await db
    .insertInto("activity_logs")
    .values(logs)
    .returningAll()
    .execute();
};

export const getActivityLogs = async () => {
  return await db.selectFrom("activity_logs").selectAll().execute();
};
