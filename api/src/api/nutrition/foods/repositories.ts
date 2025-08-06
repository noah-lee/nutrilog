import db from "@/db/config";
import { FoodLogInsert } from "@/api/nutrition/foods/types";

export const addFoodLogs = async (logs: FoodLogInsert[]) => {
  if (logs.length === 0) {
    return [];
  }
  return await db.insertInto("food_logs").values(logs).returningAll().execute();
};

export const getFoodLogs = async () => {
  return await db.selectFrom("food_logs").selectAll().execute();
};
