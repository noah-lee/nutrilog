import { ingestService } from "@/api/nutrition/services";
import { IngestRequest, IngestResponse } from "@/api/nutrition/type";
import { FastifyReply, FastifyRequest } from "fastify";

export const ingestController = async (
  request: FastifyRequest<{ Body: IngestRequest }>,
  reply: FastifyReply<{ Reply: IngestResponse }>
) => {
  const input = request.body.input;
  const result = await ingestService(input);
  return reply.status(200).send(result);
};
