import { FastifyError, FastifyReply } from "fastify";

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
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  UNAUTHORIZED: "UNAUTHORIZED",
} as const;

export const errorHandler = (error: FastifyError, reply: FastifyReply) => {
  if (error instanceof ApiError) {
    return reply.status(error.statusCode).send({
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
    });
  }

  if (error.validation) {
    return reply.status(400).send({
      message: "Validation error",
      code: ERROR_CODES.VALIDATION_ERROR,
      statusCode: 400,
      details: error.validation,
    });
  }

  return reply.status(500).send({
    message: "Internal server error",
    code: ERROR_CODES.INTERNAL_SERVER_ERROR,
    statusCode: 500,
  });
};
