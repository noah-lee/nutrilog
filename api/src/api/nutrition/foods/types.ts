import { Database } from "@/api/types";
import { Insertable, Selectable } from "kysely";

type FoodLogTable = Database["food_logs"];

export type FoodLog = Selectable<FoodLogTable>;

export type FoodLogInsert = Insertable<FoodLogTable>;

export type GetFoodsResponse = FoodLog[];
