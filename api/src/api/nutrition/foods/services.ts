import { deleteFoodLog, getFoodLogs, updateFoodLog } from "@/api/nutrition/foods/repositories";
import { UpdateFoodLogBody } from "./types";
import { ApiError, ERROR_CODES } from "@/utils/errors";

export const getFoodsService = async (startDate?: Date, endDate?: Date) => {
  try {
    return await getFoodLogs(startDate, endDate);
  } catch (error) {
    throw new ApiError(500, 'Failed to retrieve food logs', ERROR_CODES.DATABASE_ERROR);
  }
}

export const updateFoodLogService = async (id: number, data: UpdateFoodLogBody) => {
  try {
    const result = await updateFoodLog(id, data);
    if (!result) {
      throw new ApiError(404, `Food log with id ${id} not found`, ERROR_CODES.NOT_FOUND);
    }
    return result;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, 'Failed to update food log', ERROR_CODES.DATABASE_ERROR);
  }
}

export const deleteFoodLogService = async (id: number) => {
  try {
    const result = await deleteFoodLog(id);
    if (!result) {
      throw new ApiError(404, `Food log with id ${id} not found`, ERROR_CODES.NOT_FOUND);
    }
    return result;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, 'Failed to delete food log', ERROR_CODES.DATABASE_ERROR);
  }
}