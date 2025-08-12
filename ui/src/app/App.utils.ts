import type { FoodLog } from "@/api/nutrition/foods/types";
import type { Log } from "@/app/App.types";

export const isFoodLog = (log: Log): log is FoodLog => {
  return "protein" in log;
};
