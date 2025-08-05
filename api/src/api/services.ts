import { NutritionData } from "@/api/type";
import {
  API_KEY,
  API_URL,
  MAX_TOKENS,
  MODEL,
  SYSTEM_PROMPT,
} from "@/config/openai";

export const parseNutritionData = async (
  input: string
): Promise<NutritionData> => {
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
    const nutritionData = JSON.parse(content);

    if (!validateNutritionData(nutritionData)) {
      throw new Error("Invalid nutrition data format.");
    }

    return nutritionData;
  } catch (err) {
    throw new Error("Failed to parse OpenAI JSON response.");
  }
};

const validateNutritionData = (data: unknown): boolean => {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const foods = (data as Record<string, unknown>).foods;
  const activities = (data as Record<string, unknown>).activities;
  if (!Array.isArray(foods) || !Array.isArray(activities)) {
    return false;
  }

  const [food] = foods;
  const [activity] = activities;

  if (
    (food && typeof food !== "object") ||
    (activity && typeof activity !== "object")
  ) {
    return false;
  }

  if (
    typeof food.description !== "string" ||
    typeof food.calories !== "number" ||
    typeof food.protein !== "number" ||
    typeof activity.description !== "string" ||
    typeof activity.calories !== "number"
  ) {
    return false;
  }

  return true;
};
