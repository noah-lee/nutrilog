import {
  deleteFoodLogSchema,
  getFoodLogsSchema,
  updateFoodLogSchema,
} from "@/api/nutrition/foods/schemas";
import {
  deleteFoodLogService,
  getFoodLogsService,
  updateFoodLogService,
} from "@/api/nutrition/foods/services";
import { FoodLog, FoodLogUpdate } from "@/api/nutrition/foods/types";
import { StartEndQueries } from "@/api/nutrition/type";
import { FastifyInstance } from "fastify";

const foodsRoutes = (fastify: FastifyInstance) => {
  fastify.get<{ Querystring: StartEndQueries; Reply: FoodLog[] }>(
    "/",
    { schema: getFoodLogsSchema },
    async (request, reply) => {
      const { start, end } = request.query;
      const user = request.user!;
      const startDate = start ? new Date(start) : undefined;
      const endDate = end ? new Date(end) : undefined;
      const foodLogs = await getFoodLogsService(user.id, startDate, endDate);
      return reply.status(200).send(foodLogs);
    }
  );

  fastify.patch<{
    Params: { id: number };
    Body: FoodLogUpdate;
    Reply: FoodLog;
  }>("/:id", { schema: updateFoodLogSchema }, async (request, reply) => {
    const id = request.params.id;
    const user = request.user!;
    const updatedFoodLog = await updateFoodLogService(
      user.id,
      id,
      request.body
    );
    return reply.status(200).send(updatedFoodLog);
  });

  fastify.delete<{
    Params: { id: number };
    Reply: FoodLog;
  }>("/:id", { schema: deleteFoodLogSchema }, async (request, reply) => {
    const id = request.params.id;
    const user = request.user!;
    const deletedFoodLog = await deleteFoodLogService(user.id, id);
    return reply.status(200).send(deletedFoodLog);
  });
};

export default foodsRoutes;
