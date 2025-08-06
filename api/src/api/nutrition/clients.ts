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

export const getLLMNutritionSummary = async (
  input: string
): Promise<NutritionSummary> => {
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

    if (!validateLLMResponse(nutritionSummary)) {
      throw new Error("Invalid nutrition data format.");
    }

    return nutritionSummary;
  } catch (err) {
    throw new Error("Failed to parse OpenAI JSON response.");
  }
};

const validateLLMResponse = (data: unknown): boolean => {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const foods = (data as Record<string, unknown>).foods;
  const activities = (data as Record<string, unknown>).activities;
  if (!Array.isArray(foods) || !Array.isArray(activities)) {
    return false;
  }

  // Validate foods array (can be empty, but if not, all items must have required fields)
  if (!foods.every(
    (food) =>
      typeof food === "object" &&
      food !== null &&
      typeof (food as any).description === "string" &&
      typeof (food as any).calories === "number" &&
      typeof (food as any).protein === "number"
  )) {
    return false;
  }

  // Validate activities array (can be empty, but if not, all items must have required fields)
  if (!activities.every(
    (activity) =>
      typeof activity === "object" &&
      activity !== null &&
      typeof (activity as any).description === "string" &&
      typeof (activity as any).calories === "number"
  )) {
    return false;
  }

  return true;
};
