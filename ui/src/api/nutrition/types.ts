import type { ActivityLog } from "@/api/nutrition/activities/types";
import type { FoodLog } from "@/api/nutrition/foods/types";

export type NutritionSummary = {
  foods: Pick<FoodLog, "description" | "calories" | "protein">[];
  activities: Pick<ActivityLog, "description" | "calories">[];
  feedback: string;
};

export type IngestResponse = NutritionSummary;

export type IngestRequest = {
  data: { input: string };
};
