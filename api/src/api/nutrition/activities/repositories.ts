import db from "@/db/config";
import {
  ActivityLogInsert,
  ActivityLogUpdate,
} from "@/api/nutrition/activities/types";

export const insertActivityLogs = async (logs: ActivityLogInsert[]) => {
  if (!logs.length) {
    return Promise.resolve([]);
  }
  return await db
    .insertInto("activity_logs")
    .values(logs)
    .returning(["id", "description", "calories", "created_at"])
    .execute();
};

export const getActivityLogs = async (
  userId: string,
  startDate?: Date,
  endDate?: Date
) => {
  let query = db
    .selectFrom("activity_logs")
    .select(["id", "description", "calories", "created_at"])
    .where("user_id", "=", userId);

  if (startDate) {
    query = query.where("created_at", ">=", startDate);
  }

  if (endDate) {
    query = query.where("created_at", "<=", endDate);
  }

  return await query.execute();
};

export const updateActivityLog = async (
  userId: string,
  id: number,
  data: ActivityLogUpdate
) => {
  return await db
    .updateTable("activity_logs")
    .set(data)
    .where("id", "=", id)
    .where("user_id", "=", userId)
    .returning(["id", "description", "calories", "created_at"])
    .executeTakeFirst();
};

export const deleteActivityLog = async (userId: string, id: number) => {
  return await db
    .deleteFrom("activity_logs")
    .where("id", "=", id)
    .where("user_id", "=", userId)
    .returning(["id", "description", "calories", "created_at"])
    .executeTakeFirst();
};
