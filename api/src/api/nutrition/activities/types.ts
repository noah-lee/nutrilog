import { Database } from "@/api/types";
import { Insertable, Selectable, Updateable } from "kysely";

type ActivityLogTable = Database["activity_logs"];

export type ActivityLog = Selectable<ActivityLogTable>;

export type ActivityLogInsert = Insertable<ActivityLogTable>;

export type GetActivitiesResponse = ActivityLog[];

export type ActivityLogUpdateParams = { id: number };

export type ActivityLogUpdateBody = Updateable<ActivityLogTable>;

export type ActivityLogUpdateResponse = ActivityLog | string;

export type ActivityLogDeleteParams = { id: number };

export type ActivityLogDeleteResponse = ActivityLog | string;
