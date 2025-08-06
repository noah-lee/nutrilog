import { getFoodsService } from "@/api/nutrition/foods/services";
import { GetFoodsResponse } from "@/api/nutrition/foods/types";
import { FastifyReply, FastifyRequest } from "fastify";

export const getFoodsController = async (
  _: FastifyRequest,
  reply: FastifyReply<{ Reply: GetFoodsResponse }>
) => {
  const foodLogs = await getFoodsService();
  return reply.status(200).send(foodLogs);
};
