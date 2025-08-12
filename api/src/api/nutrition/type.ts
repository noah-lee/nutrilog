import { ActivityLogInsert } from "@/api/nutrition/activities/types";
import { FoodLogInsert } from "@/api/nutrition/foods/types";

export type NutritionSummary = {
  foods: FoodLogInsert[];
  activities: ActivityLogInsert[];
  feedback: string;
};

export type Biometrics = {
  sex: "male" | "female" | "other";
  age: number;
  weight: number;
  height: number;
};

export type IngestRequest = {
  prompt: string;
  biometrics: Biometrics;
};

export type IngestResponse = NutritionSummary;

export type StartEndQueries = { start?: string; end?: string };
