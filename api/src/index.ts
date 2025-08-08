import apiRoutes from "@/api/routes";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { errorHandler } from "@/utils/errors";
import { CORS_CONFIG } from "@/cors/config";

const fastify = Fastify({
  logger: true,
  ajv: {
    customOptions: {
      removeAdditional: "all",
    },
  },
});

fastify.register(cors, CORS_CONFIG);

fastify.setErrorHandler((error, _, reply) => {
  fastify.log.error(error);
  errorHandler(error, reply);
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
