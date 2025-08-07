import {
  deleteFoodLogSchema,
  updateFoodLogSchema,
} from "@/api/nutrition/foods/schemas";
import {
  deleteFoodLogService,
  getFoodsService,
  updateFoodLogService,
} from "@/api/nutrition/foods/services";
import {
  GetFoodsResponse,
  FoodLogUpdateBody,
  FoodLogUpdateResponse,
  FoodLogUpdateParams,
  FoodLogDeleteParams,
  FoodLogDeleteResponse,
} from "@/api/nutrition/foods/types";
import { FastifyInstance } from "fastify";

const foodsRoutes = (fastify: FastifyInstance) => {
  fastify.get<{ Reply: GetFoodsResponse }>("/", async (_, reply) => {
    const foodLogs = await getFoodsService();
    return reply.status(200).send(foodLogs);
  });

  fastify.patch<{
    Params: FoodLogUpdateParams;
    Body: FoodLogUpdateBody;
    Reply: FoodLogUpdateResponse;
  }>("/:id", { schema: updateFoodLogSchema }, async (request, reply) => {
    const id = request.params.id;
    const updatedFoodLog = await updateFoodLogService(id, request.body);

    if (!updatedFoodLog) {
      return reply.status(404).send("Food log entry not found");
    }

    return reply.status(200).send(updatedFoodLog);
  });

  fastify.delete<{
    Params: FoodLogDeleteParams;
    Reply: FoodLogDeleteResponse;
  }>("/:id", { schema: deleteFoodLogSchema }, async (request, reply) => {
    const id = request.params.id;
    const deletedFoodLog = await deleteFoodLogService(id);

    if (!deletedFoodLog) {
      return reply.status(404).send("Food log entry not found");
    }

    return reply.status(200).send(deletedFoodLog);
  });
};

export default foodsRoutes;
