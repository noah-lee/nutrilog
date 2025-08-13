import { FoodLogInsert } from "@/api/nutrition/foods/types";

export const isFoodLog = (value: unknown): value is FoodLogInsert => {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as FoodLogInsert).description === "string" &&
    typeof (value as FoodLogInsert).calories === "number" &&
    typeof (value as FoodLogInsert).protein === "number"
  );
};
