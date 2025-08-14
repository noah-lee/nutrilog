import { FastifyInstance } from "fastify";
import nutritionRoutes from "@/api/nutrition/routes";
import authRoutes from "@/api/auth/routes";
import { handleAuth } from "@/api/auth/handlers";

const apiRoutes = (fastify: FastifyInstance) => {
  fastify.register(nutritionRoutes, {
    prefix: "/nutrition",
    preHandler: handleAuth,
  });
  fastify.register(authRoutes, { prefix: "/auth" });
};

export default apiRoutes;
