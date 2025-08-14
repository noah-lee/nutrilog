import {
  deleteFoodLog,
  getFoodLogs,
  insertFoodLogs,
  updateFoodLog,
} from "@/api/nutrition/foods/repositories";
import { FoodLogInsert, FoodLogUpdate } from "@/api/nutrition/foods/types";
import { ApiError, ERROR_CODES } from "@/utils/errors";

export const getFoodLogsService = async (
  userId: string,
  startDate?: Date,
  endDate?: Date
) => {
  try {
    return await getFoodLogs(userId, startDate, endDate);
  } catch (error) {
    throw new ApiError(
      500,
      "Failed to retrieve food logs",
      ERROR_CODES.DATABASE_ERROR
    );
  }
};

export const insertFoodLogsService = async (data: FoodLogInsert[]) => {
  try {
    return await insertFoodLogs(data);
  } catch (error) {
    throw new ApiError(
      500,
      "Failed to insert food logs",
      ERROR_CODES.DATABASE_ERROR
    );
  }
};

export const updateFoodLogService = async (
  userId: string,
  id: number,
  data: FoodLogUpdate
) => {
  try {
    const result = await updateFoodLog(userId, id, data);
    if (!result) {
      throw new ApiError(
        404,
        `Food log with id ${id} not found`,
        ERROR_CODES.NOT_FOUND
      );
    }
    return result;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(
      500,
      "Failed to update food log",
      ERROR_CODES.DATABASE_ERROR
    );
  }
};

export const deleteFoodLogService = async (userId: string, id: number) => {
  try {
    const result = await deleteFoodLog(userId, id);
    if (!result) {
      throw new ApiError(
        404,
        `Food log with id ${id} not found`,
        ERROR_CODES.NOT_FOUND
      );
    }
    return result;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(
      500,
      "Failed to delete food log",
      ERROR_CODES.DATABASE_ERROR
    );
  }
};
