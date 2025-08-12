import { ActivityLogInsert } from "@/api/nutrition/activities/types";
import { FoodLogInsert } from "@/api/nutrition/foods/types";

export type NutritionSummary = {
  foods: FoodLogInsert[];
  activities: ActivityLogInsert[];
  feedback: string;
};

export type IngestRequest = {
  input: string;
};

export type IngestResponse = NutritionSummary;

export type StartEndQueries = { start?: string; end?: string }