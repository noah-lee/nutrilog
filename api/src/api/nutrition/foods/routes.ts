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
import {
  GetFoodsResponse,
  UpdateFoodLogBody,
  UpdateFoodLogResponse,
  UpdateFoodLogParams,
  DeleteFoodLogParams,
  DeleteFoodLogResponse,
  GetFoodQueries,
} from "@/api/nutrition/foods/types";
import { FastifyInstance } from "fastify";

const foodsRoutes = (fastify: FastifyInstance) => {
  fastify.get<{ Reply: GetFoodsResponse; Querystring: GetFoodQueries }>(
    "/",
    { schema: getFoodLogsSchema },
    async (request, reply) => {
      const { start, end } = request.query;
      const startDate = start ? new Date(start) : undefined;
      const endDate = end ? new Date(end) : undefined;
      const foodLogs = await getFoodLogsService(startDate, endDate);
      return reply.status(200).send(foodLogs);
    }
  );

  fastify.patch<{
    Params: UpdateFoodLogParams;
    Body: UpdateFoodLogBody;
    Reply: UpdateFoodLogResponse;
  }>("/:id", { schema: updateFoodLogSchema }, async (request, reply) => {
    const id = request.params.id;
    const updatedFoodLog = await updateFoodLogService(id, request.body);
    return reply.status(200).send(updatedFoodLog);
  });

  fastify.delete<{
    Params: DeleteFoodLogParams;
    Reply: DeleteFoodLogResponse;
  }>("/:id", { schema: deleteFoodLogSchema }, async (request, reply) => {
    const id = request.params.id;
    const deletedFoodLog = await deleteFoodLogService(id);
    return reply.status(200).send(deletedFoodLog);
  });
};

export default foodsRoutes;
