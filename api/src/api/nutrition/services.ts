import { addActivityLogs } from "@/api/nutrition/activities/repositories";
import { getOpenAINutritionSummary } from "@/api/nutrition/clients";
import { addFoodLogs } from "@/api/nutrition/foods/repositories";

export const ingestService = async (input: string) => {
  const nutritionSummary = await getOpenAINutritionSummary(input);
  console.log("---");
  console.log("nutritionSummary", nutritionSummary);
  await addFoodLogs(nutritionSummary.foods);
  await addActivityLogs(nutritionSummary.activities);
  return nutritionSummary;
};
