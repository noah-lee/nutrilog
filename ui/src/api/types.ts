// Common types
export interface BaseResponse {
  error?: string;
}

// Food types
export interface FoodLog {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: string;
}

export interface GetFoodsResponse extends BaseResponse {
  data: FoodLog[];
}

export interface UpdateFoodLogRequest {
  name?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  date?: string;
}

// Activity types
export interface ActivityLog {
  id: string;
  name: string;
  caloriesBurned: number;
  duration: number;
  date: string;
}

export interface GetActivitiesResponse extends BaseResponse {
  data: ActivityLog[];
}

export interface UpdateActivityLogRequest {
  name?: string;
  caloriesBurned?: number;
  duration?: number;
  date?: string;
}
