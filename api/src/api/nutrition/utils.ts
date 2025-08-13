import { isActivityLog } from "@/api/nutrition/activities/utils";
import { isFoodLog } from "@/api/nutrition/foods/utils";
import { NutritionSummary } from "@/api/nutrition/type";

export const isNutritionSummary = (
  value: unknown
): value is NutritionSummary => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Partial<NutritionSummary>;

  return (
    Array.isArray(candidate.foods) &&
    Array.isArray(candidate.activities) &&
    typeof candidate.feedback === "string" &&
    candidate.foods.every(isFoodLog) &&
    candidate.activities.every(isActivityLog)
  );
};
