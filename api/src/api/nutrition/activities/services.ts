import { deleteActivityLog, getActivityLogs, updateActivityLog } from "@/api/nutrition/activities/repositories";
import { ActivityLogUpdateBody } from "./types";

export const getActivitiesService = async () => {
  return await getActivityLogs();
};

export const updateActivityLogService = async (id: number, data: ActivityLogUpdateBody) => {
  return await updateActivityLog(id, data);
};

export const deleteActivityLogService = async (id: number) => {
  return await deleteActivityLog(id);
};
