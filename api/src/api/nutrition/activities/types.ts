import { StartEndQueries } from "@/api/nutrition/type";
import { Database } from "@/api/types";
import { Insertable, Selectable, Updateable } from "kysely";

type ActivityLogTable = Database["activity_logs"];

export type ActivityLog = Selectable<ActivityLogTable>;

export type ActivityLogInsert = Insertable<ActivityLogTable>;

export type GetActivityQueries = StartEndQueries;

export type GetActivitiesResponse = ActivityLog[];

export type UpdateActivityLogParams = { id: number };

export type UpdateActivityLogBody = Updateable<ActivityLogTable>;

export type UpdateActivityLogResponse = ActivityLog | string;

export type DeleteActivityLogParams = { id: number };

export type DeleteActivityLogResponse = ActivityLog | string;
