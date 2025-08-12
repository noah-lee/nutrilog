import { addActivityLogs } from "@/api/nutrition/activities/repositories";
import { getOpenAINutritionSummary } from "@/api/nutrition/clients";
import { addFoodLogs } from "@/api/nutrition/foods/repositories";
import { Biometrics } from "@/api/nutrition/type";

export const ingestService = async (prompt: string, biometrics: Biometrics) => {
  const nutritionSummary = await getOpenAINutritionSummary(prompt, biometrics);
  await addFoodLogs(nutritionSummary.foods);
  await addActivityLogs(nutritionSummary.activities);
  return nutritionSummary;
};
