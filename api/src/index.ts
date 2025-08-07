import apiRoutes from "@/api/routes";
import Fastify, { FastifyError } from "fastify";
import { ApiError, ERROR_CODES } from "@/utils/errors";

const fastify = Fastify({
  logger: true,
  ajv: {
    customOptions: {
      removeAdditional: "all",
      coerceTypes: true,
      useDefaults: true,
    },
  },
});

fastify.setErrorHandler((error: FastifyError, _, reply) => {
  fastify.log.error(error);

  if (error instanceof ApiError) {
    return reply.status(error.statusCode).send({
      error: {
        message: error.message,
        code: error.code,
      },
    });
  }

  if (error.validation) {
    return reply.status(400).send({
      error: {
        message: "Validation error",
        code: ERROR_CODES.VALIDATION_ERROR,
        details: error.validation,
      },
    });
  }

  return reply.status(500).send({
    error: {
      message: 500,
      code: ERROR_CODES.INTERNAL_ERROR,
    },
  });
});

fastify.register(apiRoutes, { prefix: "/api" });

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
