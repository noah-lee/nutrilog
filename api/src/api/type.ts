export type FoodEntry = {
  description: string;
  calories: number;
  protein: number;
};

export type ActivityEntry = {
  description: string;
  calories: number;
};

export type NutritionData = {
  foods: FoodEntry[];
  activities: ActivityEntry[];
  feedback: string;
};

export type IngestRequest = {
  input: string;
};

export type IngestResponse = NutritionData;