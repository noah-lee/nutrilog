import type { ActivityLog } from "@/api/nutrition/activities/types";
import type { FoodLog } from "@/api/nutrition/foods/types";

export type NutritionSummary = {
  foods: Pick<FoodLog, "description" | "calories" | "protein">[];
  activities: Pick<ActivityLog, "description" | "calories">[];
  feedback: string;
};

export type IngestResponse = NutritionSummary;

export type Biometrics = {
  sex: "male" | "female" | "other";
  age: number;
  weight: number;
  height: number;
};

export type IngestRequest = {
  data: { prompt: string; biometrics: Biometrics, start?: string, end?:string };
};

export type StartEndQueries = {
  start?: string;
  end?: string;
};
