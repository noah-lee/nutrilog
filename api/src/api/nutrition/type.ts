import { ActivityLogInsert } from "@/api/nutrition/activities/types";
import { FoodLogInsert } from "@/api/nutrition/foods/types";

export type NutritionSummary = {
  foods: Omit<FoodLogInsert, "userId">[];
  activities: Omit<ActivityLogInsert, "userId">[];
  feedback: string;
};

export type IngestRequest = {
  prompt: string;
  start?: string;
  end?: string;
};

export type IngestResponse = NutritionSummary;

export type StartEndQueries = { start?: string; end?: string };
