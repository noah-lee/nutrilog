import { Database } from "@/api/types";
import { Insertable, Selectable, Updateable } from "kysely";

type FoodLogTable = Database["food_logs"];

export type FoodLog = Selectable<FoodLogTable>;

export type FoodLogInsert = Insertable<FoodLogTable>;

export type GetFoodsResponse = FoodLog[];

export type FoodLogUpdateParams = { id: number };

export type FoodLogUpdateBody = Updateable<FoodLogTable>;

export type FoodLogUpdateResponse = FoodLog | string;

export type FoodLogDeleteParams = { id: number };

export type FoodLogDeleteResponse = FoodLog | string;

