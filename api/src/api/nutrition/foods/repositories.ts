import db from "@/db/config";
import { FoodLogInsert, FoodLogUpdateBody } from "@/api/nutrition/foods/types";

export const addFoodLogs = async (logs: FoodLogInsert[]) => {
  if (!logs.length) {
    return Promise.resolve([]);
  }
  return await db.insertInto("food_logs").values(logs).returningAll().execute();
};

export const getFoodLogs = async () => {
  return await db.selectFrom("food_logs").selectAll().execute();
};

export const updateFoodLog = async (id: number, data: FoodLogUpdateBody) => {
  return await db
    .updateTable("food_logs")
    .set(data)
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
};

export const deleteFoodLog = async (id: number) => {
  return await db
    .deleteFrom("food_logs")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
};
