import { getActivityLogs } from "@/api/nutrition/activities/repositories";

export const getActivitiesService = async () => {
  return await getActivityLogs();
};
