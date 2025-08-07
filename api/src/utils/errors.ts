export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: keyof typeof ERROR_CODES
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const ERROR_CODES = {
  NOT_FOUND: "NOT_FOUND",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  EXTERNAL_API_ERROR: "EXTERNAL_API_ERROR",
  DATABASE_ERROR: "DATABASE_ERROR",
  INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;
