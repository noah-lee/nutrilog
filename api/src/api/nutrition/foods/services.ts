import { deleteFoodLog, getFoodLogs, updateFoodLog } from "@/api/nutrition/foods/repositories";
import { FoodLogUpdateBody } from "./types";

export const getFoodsService = async () => {
  return await getFoodLogs();
}

export const updateFoodLogService = async (id: number, data: FoodLogUpdateBody) => {
  return await updateFoodLog(id, data);
}

export const deleteFoodLogService = async (id: number) => {
  return await deleteFoodLog(id);
}