import activitiesRoutes from "@/api/nutrition/activities/routes";
import {
  getActivityLogsService,
  insertActivityLogsService,
} from "@/api/nutrition/activities/services";
import foodsRoutes from "@/api/nutrition/foods/routes";
import {
  getFoodLogsService,
  insertFoodLogsService,
} from "@/api/nutrition/foods/services";
import { ingestSchema } from "@/api/nutrition/schemas";
import { ingestService } from "@/api/nutrition/services";
import { IngestRequest, IngestResponse } from "@/api/nutrition/type";
import { FastifyInstance } from "fastify";

const nutritionRoutes = (fastify: FastifyInstance) => {
  fastify.post<{ Body: IngestRequest; Reply: IngestResponse }>(
    "/ingest",
    { schema: ingestSchema },
    async (request, reply) => {
      const { prompt, biometrics, start, end } = request.body;

      const startDate = start ? new Date(start) : undefined;
      const endDate = end ? new Date(end) : undefined;

      const foods =
        startDate && endDate
          ? await getFoodLogsService(startDate, endDate)
          : undefined;
      const activities =
        startDate && endDate
          ? await getActivityLogsService(startDate, endDate)
          : undefined;

      const nutritionSummary = await ingestService(
        prompt,
        biometrics,
        foods,
        activities
      );

      await insertFoodLogsService(nutritionSummary.foods);
      await insertActivityLogsService(nutritionSummary.activities);

      return reply.status(200).send(nutritionSummary);
    }
  );

  fastify.register(foodsRoutes, { prefix: "/foods" });
  fastify.register(activitiesRoutes, { prefix: "/activities" });
};

export default nutritionRoutes;
