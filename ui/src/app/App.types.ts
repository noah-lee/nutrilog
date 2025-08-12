import type { ActivityLog } from "@/api/nutrition/activities/types";
import type { FoodLog } from "@/api/nutrition/foods/types";

export type Log = FoodLog | ActivityLog;
