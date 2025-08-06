import { getActivitiesController } from "@/api/nutrition/activities/controllers";
import { GetActivitiesResponse } from "@/api/nutrition/activities/types";
import { FastifyInstance } from "fastify";

const activitiesRoutes = (fastify: FastifyInstance) => {
  fastify.get<{ Reply: GetActivitiesResponse }>("/", getActivitiesController);
};

export default activitiesRoutes;
