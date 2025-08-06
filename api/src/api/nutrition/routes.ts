import activitiesRoutes from "@/api/nutrition/activities/routes";
import { ingestController } from "@/api/nutrition/controllers";
import foodsRoutes from "@/api/nutrition/foods/routes";
import { ingestSchema } from "@/api/nutrition/schemas";
import { IngestRequest, IngestResponse } from "@/api/nutrition/type";
import { FastifyInstance } from "fastify";

const nutritionRoutes = (fastify: FastifyInstance) => {
  fastify.post<{ Body: IngestRequest; Reply: IngestResponse }>(
    "/ingest",
    { schema: ingestSchema },
    ingestController
  );

  fastify.register(foodsRoutes, { prefix: "/foods" });
  fastify.register(activitiesRoutes, { prefix: "/activities" });
};

export default nutritionRoutes;
