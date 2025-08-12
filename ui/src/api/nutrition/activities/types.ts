import type { StartEndQueries } from "@/api/nutrition/types";

export type ActivityLog = {
  id: number;
  description: string;
  calories: number;
  embedding: string | null;
  created_at: string;
};

export type GetActivityLogsQueries = StartEndQueries;

export type GetActivityLogsResponse = ActivityLog[];

export type UpdateActivityLogRequest = {
  params: { id: number };
  data: Partial<Pick<ActivityLog, "description" | "calories">>;
};

export type UpdateActivityLogResponse = ActivityLog;

export type DeleteActivityLogRequest = {
  params: { id: number };
};

export type DeleteActivityLogResponse = ActivityLog;
