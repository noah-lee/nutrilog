import { deleteActivityLog, getActivityLogs, updateActivityLog } from "@/api/nutrition/activities/repositories";
import { ActivityLogUpdateBody } from "./types";
import { ApiError, ERROR_CODES } from "@/utils/errors";

export const getActivitiesService = async () => {
  try {
    return await getActivityLogs();
  } catch (error) {
    throw new ApiError(500, 'Failed to retrieve activity logs', ERROR_CODES.DATABASE_ERROR);
  }
};

export const updateActivityLogService = async (id: number, data: ActivityLogUpdateBody) => {
  try {
    const result = await updateActivityLog(id, data);
    if (!result) {
      throw new ApiError(404, `Activity log with id ${id} not found`, ERROR_CODES.NOT_FOUND);
    }
    return result;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, 'Failed to update activity log', ERROR_CODES.DATABASE_ERROR);
  }
};

export const deleteActivityLogService = async (id: number) => {
  try {
    const result = await deleteActivityLog(id);
    if (!result) {
      throw new ApiError(404, `Activity log with id ${id} not found`, ERROR_CODES.NOT_FOUND);
    }
    return result;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, 'Failed to delete activity log', ERROR_CODES.DATABASE_ERROR);
  }
};
