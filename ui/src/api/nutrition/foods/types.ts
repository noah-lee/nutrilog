export type FoodLog = {
  id: number;
  description: string;
  calories: number;
  protein: number;
  embedding: string | null;
  created_at: string;
};

export type GetFoodLogsResponse = FoodLog[];

export type UpdateFoodLogRequest = {
  params: { id: number };
  data: Partial<Pick<FoodLog, "description" | "calories" | "protein">>;
};

export type UpdateFoodLogResponse = FoodLog;

export type DeleteFoodLogRequest = {
  params: { id: number };
};

export type DeleteFoodLogResponse = FoodLog;
