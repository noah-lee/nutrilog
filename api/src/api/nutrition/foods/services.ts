import { getFoodLogs } from "@/api/nutrition/foods/repositories";

export const getFoodsService = async () => {
  return await getFoodLogs();
}