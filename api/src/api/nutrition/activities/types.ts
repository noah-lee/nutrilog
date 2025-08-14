import { Database } from "@/api/types";
import { Insertable, Selectable, Updateable } from "kysely";

type ActivityLogTable = Database["activity_logs"];

export type ActivityLog = Omit<Selectable<ActivityLogTable>, "user_id">;

export type ActivityLogInsert = Omit<
  Insertable<ActivityLogTable>,
  "id" | "created_at"
>;

export type ActivityLogUpdate = Omit<
  Updateable<ActivityLogTable>,
  "id" | "user_id" | "created_at"
>;
