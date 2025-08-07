import { ActivityLogInsert } from "@/api/nutrition/activities/types";
import { FoodLogInsert } from "@/api/nutrition/foods/types";
import { NutritionSummary } from "@/api/nutrition/type";
import { API_KEY, API_URL } from "@/llm/config";

const SYSTEM_PROMPT = `
You are a strict nutrition and activity tracking assistant.

Given plain English input, return only:

1. "foods": array of food objects with:
  - "description": normalized label (fix spelling, match past context if similar), including food type and quantity
  - "calories": numeric, user-provided or conservative estimate (round up)
  - "protein": numeric grams, user-provided or conservative estimate (round down)

2. "activities": array of activity objects with:
  - "description": normalized label, including exercise type and duration
  - "calories": numeric, user-provided or conservative estimate (round down)

3. "feedback": 1–2 helpful, encouraging sentences.
  - If it's the first log of the day, give a positive welcome.
  - If prior entries (provided in context), summarize food and activity progress.
  - Only mention calories and protein (not weight, diet plans, or goals beyond those).

⚠️ If the user says anything unrelated (e.g. jokes, weather, chat), respond only with:
"Sorry! I can only help with tracking food and activity for calories and protein."

Return only this strict JSON:
{
  "foods": [...],
  "activities": [...],
  "feedback": "..."
}
No extra commentary or formatting.
`;

const MODEL = "gpt-4.1-nano";
const MAX_TOKENS = 1000;

export const getOpenAINutritionSummary = async (input: string) => {
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: input },
  ];

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0,
      max_tokens: MAX_TOKENS,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${errorBody}`);
  }

  const { choices } = await response.json();

  const content = choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("No content returned from OpenAI response.");
  }

  try {
    const nutritionSummary = JSON.parse(content);

    if (!isNutritionSummary(nutritionSummary)) {
      throw new Error("Invalid nutrition data format.");
    }

    return nutritionSummary;
  } catch (err) {
    throw new Error("Failed to parse OpenAI JSON response.");
  }
};

const isFoodLog = (value: unknown): value is FoodLogInsert => {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as FoodLogInsert).description === "string" &&
    typeof (value as FoodLogInsert).calories === "number" &&
    typeof (value as FoodLogInsert).protein === "number"
  );
};

const isActivityLog = (value: unknown): value is ActivityLogInsert => {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as ActivityLogInsert).description === "string" &&
    typeof (value as ActivityLogInsert).calories === "number"
  );
};

const isNutritionSummary = (value: unknown): value is NutritionSummary => {
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
