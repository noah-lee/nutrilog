import db from "@/db/config";
import { FoodLogInsert, FoodLogUpdate } from "@/api/nutrition/foods/types";

export const insertFoodLogs = async (logs: FoodLogInsert[]) => {
  if (!logs.length) {
    return Promise.resolve([]);
  }
  return await db
    .insertInto("food_logs")
    .values(logs)
    .returning(["id", "description", "calories", "protein", "created_at"])
    .execute();
};

export const getFoodLogs = async (
  userId: string,
  startDate?: Date,
  endDate?: Date
) => {
  let query = db
    .selectFrom("food_logs")
    .select(["id", "description", "calories", "protein", "created_at"])
    .where("user_id", "=", userId);

  if (startDate) {
    query = query.where("created_at", ">=", startDate);
  }

  if (endDate) {
    query = query.where("created_at", "<=", endDate);
  }

  return await query.execute();
};

export const updateFoodLog = async (
  userId: string,
  id: number,
  data: FoodLogUpdate
) => {
  return await db
    .updateTable("food_logs")
    .set(data)
    .where("id", "=", id)
    .where("user_id", "=", userId)
    .returning(["id", "description", "calories", "protein", "created_at"])
    .executeTakeFirst();
};

export const deleteFoodLog = async (userId: string, id: number) => {
  return await db
    .deleteFrom("food_logs")
    .where("id", "=", id)
    .where("user_id", "=", userId)
    .returning(["id", "description", "calories", "protein", "created_at"])
    .executeTakeFirst();
};
