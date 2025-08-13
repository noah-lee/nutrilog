import {
  deleteActivityLog,
  getActivityLogs,
  insertActivityLogs,
  updateActivityLog,
} from "@/api/nutrition/activities/repositories";
import { InsertActivityLogBody, UpdateActivityLogBody } from "./types";
import { ApiError, ERROR_CODES } from "@/utils/errors";

export const getActivityLogsService = async (
  startDate?: Date,
  endDate?: Date
) => {
  try {
    return await getActivityLogs(startDate, endDate);
  } catch (error) {
    throw new ApiError(
      500,
      "Failed to retrieve activity logs",
      ERROR_CODES.DATABASE_ERROR
    );
  }
};

export const insertActivityLogsService = async (
  data: InsertActivityLogBody[]
) => {
  try {
    return await insertActivityLogs(data);
  } catch (error) {
    throw new ApiError(
      500,
      "Failed to insert activity logs",
      ERROR_CODES.DATABASE_ERROR
    );
  }
};

export const updateActivityLogService = async (
  id: number,
  data: UpdateActivityLogBody
) => {
  try {
    const result = await updateActivityLog(id, data);
    if (!result) {
      throw new ApiError(
        404,
        `Activity log with id ${id} not found`,
        ERROR_CODES.NOT_FOUND
      );
    }
    return result;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(
      500,
      "Failed to update activity log",
      ERROR_CODES.DATABASE_ERROR
    );
  }
};

export const deleteActivityLogService = async (id: number) => {
  try {
    const result = await deleteActivityLog(id);
    if (!result) {
      throw new ApiError(
        404,
        `Activity log with id ${id} not found`,
        ERROR_CODES.NOT_FOUND
      );
    }
    return result;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(
      500,
      "Failed to delete activity log",
      ERROR_CODES.DATABASE_ERROR
    );
  }
};
