import { StartEndQueries } from "@/api/nutrition/type";
import { Database } from "@/api/types";
import { Insertable, Selectable, Updateable } from "kysely";

type FoodLogTable = Database["food_logs"];

export type FoodLog = Selectable<FoodLogTable>;

export type FoodLogInsert = Insertable<FoodLogTable>;

export type GetFoodQueries = StartEndQueries;

export type GetFoodsResponse = FoodLog[];

export type UpdateFoodLogParams = { id: number };

export type UpdateFoodLogBody = Updateable<FoodLogTable>;

export type UpdateFoodLogResponse = FoodLog | string;

export type DeleteFoodLogParams = { id: number };

export type DeleteFoodLogResponse = FoodLog | string;
