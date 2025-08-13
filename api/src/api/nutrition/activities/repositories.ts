import db from "@/db/config";
import {
  ActivityLogInsert,
  UpdateActivityLogBody,
} from "@/api/nutrition/activities/types";

export const insertActivityLogs = async (logs: ActivityLogInsert[]) => {
  if (!logs.length) {
    return Promise.resolve([]);
  }
  return await db
    .insertInto("activity_logs")
    .values(logs)
    .returningAll()
    .execute();
};

export const getActivityLogs = async (startDate?: Date, endDate?: Date) => {
  let query = db.selectFrom("activity_logs").selectAll();

  if (startDate) {
    query = query.where("created_at", ">=", startDate);
  }

  if (endDate) {
    query = query.where("created_at", "<=", endDate);
  }

  return await query.execute();
};

export const updateActivityLog = async (
  id: number,
  data: UpdateActivityLogBody
) => {
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
