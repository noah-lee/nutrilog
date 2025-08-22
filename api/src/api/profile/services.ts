import { UserUpdate } from "@/api/profile/types";
import { getUserById, updateUserById } from "@/api/profile/repositories";
import { ApiError, ERROR_CODES } from "@/utils/errors";

export const getUserService = async (id: string) => {
  try {
    const user = await getUserById(id);
    if (!user) {
      throw new ApiError(
        404,
        `User with id ${id} not found`,
        ERROR_CODES.NOT_FOUND
      );
    }
    return user;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "Failed to get user", ERROR_CODES.DATABASE_ERROR);
  }
};

export const updateUserService = async (id: string, data: UserUpdate) => {
  try {
    const result = await updateUserById(id, data);
    if (!result) {
      throw new ApiError(
        404,
        `User with id ${id} not found`,
        ERROR_CODES.NOT_FOUND
      );
    }
    return result;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(
      500,
      "Failed to update user",
      ERROR_CODES.DATABASE_ERROR
    );
  }
};
