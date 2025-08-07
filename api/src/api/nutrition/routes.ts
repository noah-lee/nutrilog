import activitiesRoutes from "@/api/nutrition/activities/routes";
import foodsRoutes from "@/api/nutrition/foods/routes";
import { ingestSchema } from "@/api/nutrition/schemas";
import { ingestService } from "@/api/nutrition/services";
import { IngestRequest, IngestResponse } from "@/api/nutrition/type";
import { FastifyInstance } from "fastify";

const nutritionRoutes = (fastify: FastifyInstance) => {
  fastify.post<{ Body: IngestRequest; Reply: IngestResponse }>(
    "/ingest",
    { schema: ingestSchema },
    async (request, reply) => {
      const input = request.body.input;
      const result = await ingestService(input);
      return reply.status(200).send(result);
    }
  );

  fastify.register(foodsRoutes, { prefix: "/foods" });
  fastify.register(activitiesRoutes, { prefix: "/activities" });
};

export default nutritionRoutes;
