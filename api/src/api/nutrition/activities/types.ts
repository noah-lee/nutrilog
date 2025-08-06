import { Database } from "@/api/types";
import { Insertable, Selectable } from "kysely";

type ActivityLogTable = Database["activity_logs"];

export type ActivityLog = Selectable<ActivityLogTable>;

export type ActivityLogInsert = Insertable<ActivityLogTable>;

export type GetActivitiesResponse = ActivityLog[];
