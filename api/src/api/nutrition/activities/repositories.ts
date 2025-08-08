import db from "@/db/config";
import { ActivityLogInsert, UpdateActivityLogBody } from "@/api/nutrition/activities/types";

export const addActivityLogs = async (logs: ActivityLogInsert[]) => {
  if (!logs.length) {
    return Promise.resolve([]);
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

export const updateActivityLog = async (id: number, data: UpdateActivityLogBody) => {
  return await db
    .updateTable("activity_logs")
    .set(data)
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
};

export const deleteActivityLog = async (id: number) => {
  return await db
    .deleteFrom("activity_logs")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
};
