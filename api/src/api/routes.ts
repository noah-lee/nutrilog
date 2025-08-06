import { FastifyInstance } from "fastify";
import nutritionRoutes from "@/api/nutrition/routes";

const apiRoutes = (fastify: FastifyInstance) => {
  fastify.register(nutritionRoutes, { prefix: "/nutrition" });
};

export default apiRoutes;
