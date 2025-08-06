import { getActivityLogs } from "@/api/nutrition/activities/repositories";
import { GetActivitiesResponse } from "@/api/nutrition/activities/types";
import { FastifyReply, FastifyRequest } from "fastify";

export const getActivitiesController = async (
  _: FastifyRequest,
  reply: FastifyReply<{ Reply: GetActivitiesResponse }>
) => {
  const foodLogs = await getActivityLogs();
  return reply.status(200).send(foodLogs);
};
