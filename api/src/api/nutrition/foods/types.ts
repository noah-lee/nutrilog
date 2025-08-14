import { StartEndQueries } from "@/api/nutrition/type";
import { Database } from "@/api/types";
import { Insertable, Selectable, Updateable } from "kysely";

type FoodLogTable = Database["food_logs"];

export type FoodLog = Omit<Selectable<FoodLogTable>, "user_id">;

export type FoodLogInsert = Omit<Insertable<FoodLogTable>, "id" | "created_at">;

export type FoodLogUpdate = Omit<
  Updateable<FoodLogTable>,
  "id" | "user_id" | "created_at"
>;