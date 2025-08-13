import { ActivityLogInsert } from "@/api/nutrition/activities/types";
import { FoodLogInsert } from "@/api/nutrition/foods/types";
import { Biometrics } from "@/api/nutrition/type";
import { isNutritionSummary } from "@/api/nutrition/utils";
import { getCompletion } from "@/llm/client";
import { ApiError, ERROR_CODES } from "@/utils/errors";

const SYSTEM_PROMPT = `
You are a strict nutrition and activity tracking assistant.

Given plain English input, return only:

1. "foods":
  - "description": normalized label (fix spelling, consistent casing, match past context if similar)
  - "calories": numeric, user-provided or conservative estimate (round up)
  - "protein": numeric grams, user-provided or conservative estimate (round down)

2. "activities":
  - "description": normalized label (fix spelling, consistent casing, match past context if similar)
  - "calories": numeric, user-provided or conservative estimate (round down)

3. "feedback": 1–2 helpful, encouraging sentences.
  - If it's the first log of the day, give a positive welcome.
  - If prior entries (provided in context), summarize food and activity progress.
  - Only mention calories and protein (not weight, diet plans, or goals beyond those).

⚠️ If the user says anything unrelated (e.g. jokes, weather, chat), respond with empty foods and activities list, and feedback as:
"Sorry! I can only help with tracking food and activity for calories and protein."

‼️ VERY IMPORTANT: Return only this strict and valid JSON, with no extra text or explanation:
{
  "foods": [...],
  "activities": [...],
  "feedback": "..."
}

- Ensure all numbers are valid and units are correct.
- Do not include any fields other than "foods", "activities", and "feedback".
- If information is missing, make a conservative estimate or leave the field empty.
`;

export const ingestService = async (
  prompt: string,
  biometrics: Biometrics,
  foods?: FoodLogInsert[],
  activities?: ActivityLogInsert[]
) => {
  const userBiometrics = `The user is ${biometrics.sex}, ${biometrics.age} years old, weighs ${biometrics.weight} kg, and is ${biometrics.height} cm tall.`;

  const foodList = foods
    ?.map((food) => `-${food.description}: ${food.calories}, ${food.protein}`)
    .join("\n");
  const activityList = activities
    ?.map((activity) => `-${activity.description}: ${activity.calories}`)
    .join("\n");
  const history =
    "User has previously logged the following food and activity entries (⚠️ do not add these):\n" +
    (foodList ? `Foods:\n${foodList}\n` : "") +
    (activityList ? `Activities:\n${activityList}\n` : "");

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: userBiometrics },
    { role: "user", content: history },
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
