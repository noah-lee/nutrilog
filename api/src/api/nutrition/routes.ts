import { handleAuth } from "@/api/auth/handlers";
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
import { IngestRequest, IngestResponse } from "@/api/nutrition/types";
import { getUserService } from "@/api/profile/services";
import { FastifyInstance } from "fastify";

const nutritionRoutes = (fastify: FastifyInstance) => {
  fastify.addHook("preHandler", handleAuth);

  fastify.post<{ Body: IngestRequest; Reply: IngestResponse }>(
    "/ingest",
    { schema: ingestSchema },
    async (request, reply) => {
      const { prompt, start, end } = request.body;
      const userId = request.userId!;

      const user = await getUserService(userId);

      const startDate = start ? new Date(start) : undefined;
      const endDate = end ? new Date(end) : undefined;

      const foods =
        startDate && endDate
          ? await getFoodLogsService(userId, startDate, endDate)
          : undefined;
      const activities =
        startDate && endDate
          ? await getActivityLogsService(userId, startDate, endDate)
          : undefined;

      const nutritionSummary = await ingestService(
        prompt,
        user,
        foods,
        activities
      );

      const foodInserts = nutritionSummary.foods.map((food) => ({
        ...food,
        user_id: userId,
      }));
      const activityInserts = nutritionSummary.activities.map((activity) => ({
        ...activity,
        user_id: userId,
      }));

      await insertFoodLogsService(foodInserts);
      await insertActivityLogsService(activityInserts);

      return reply.status(200).send(nutritionSummary);
    }
  );

  fastify.register(foodsRoutes, { prefix: "/foods" });
  fastify.register(activitiesRoutes, { prefix: "/activities" });
};

export default nutritionRoutes;
