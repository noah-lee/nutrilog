import { getFoodsController } from "@/api/nutrition/foods/controllers";
import { GetFoodsResponse } from "@/api/nutrition/foods/types";
import { FastifyInstance } from "fastify";

const foodsRoutes = (fastify: FastifyInstance) => {
  fastify.get<{ Reply: GetFoodsResponse }>("/", getFoodsController);
};

export default foodsRoutes;
