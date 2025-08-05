import { parseNutritionData } from "@/api/services";
import { IngestRequest, IngestResponse } from "@/api/type";
import { FastifyReply, FastifyRequest } from "fastify";

export const ingestHandler = async (
  request: FastifyRequest<{ Body: IngestRequest }>,
  reply: FastifyReply<{ Reply: IngestResponse }>
) => {
  // Extract user input from the request body
  const input = request.body.input;
  
  // Get nutrition data from OpenAI
  const nutritionData = await parseNutritionData(input);

  return reply.status(200).send(nutritionData);
};
