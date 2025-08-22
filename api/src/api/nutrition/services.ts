import { ActivityLog } from "@/api/nutrition/activities/types";
import { FoodLog } from "@/api/nutrition/foods/types";
import { isNutritionSummary } from "@/api/nutrition/utils";
import { User } from "@/api/profile/types";
import { getCompletion } from "@/llm/client";
import { ApiError, ERROR_CODES } from "@/utils/errors";

export const ingestService = async (
  prompt: string,
  user: User,
  foods?: FoodLog[],
  activities?: ActivityLog[]
) => {
  const foodList = foods?.map((food) => foodEntry(food)).join("\n");
  const activityList = activities
    ?.map((activity) => activityEntry(activity))
    .join("\n");

  const SYSTEM_PROMPT = `
You are a strict nutrition and activity tracking assistant. 

The user is ${user.sex ?? "unknown"}, ${
    user.age ?? "unknown"
  } years old, weighs ${user.weight ?? "unknown"} kg, and is ${
    user.height ?? "unknown"
  } cm tall.

Given plain English input, return only:

- "foods":
  - "description"
  - "calories"
  - "protein"
- "activities":
  - "description"
  - "calories"
- "feedback"

- For "description": include quantity, fix spelling, first letter uppercase, consistent casing, match past context if similar.
- For "calories": numeric integer, provide user-provided or conservative estimates (round up for foods, round down for activities).
- For "protein": numeric integer, provide user-provided or conservative estimates (round down).
- For "feedback": provide 1–2 helpful, encouraging sentences based on the user's input and progress.

- If the user says anything unrelated (e.g. jokes, weather, chat), respond with empty foods and activities list, and feedback as:
"Sorry! I can only help with tracking food and activity for calories and protein."

‼️ IMPORTANT: Return only this strict and valid JSON, with no extra text or explanation:
{
  "foods": [...],
  "activities": [...],
  "feedback": "..."
}

So far, the user has logged the following foods and activities (‼️ IMPORTANT: DO NOT RETURN IN RESPONSE):
Foods: 
${foodList}

Activities: 
${activityList}
`;

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: prompt },
  ];

  const content = await getCompletion(messages);

  if (!isNutritionSummary(content)) {
    throw new ApiError(
      502,
      "Invalid nutrition data format from OpenAI.",
      ERROR_CODES.EXTERNAL_API_ERROR
    );
  }

  return content;
};

const foodEntry = (food: FoodLog) => {
  return `- ${food.description}: ${food.calories} calories, ${food.protein} g protein`;
};

const activityEntry = (activity: ActivityLog) => {
  return `- ${activity.description}: ${activity.calories} calories burned`;
};
