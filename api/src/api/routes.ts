import { ingestHandler } from "@/api/controllers";
import { ingestSchema } from "@/api/schemas";
import { IngestRequest, IngestResponse } from "@/api/type";
import { FastifyInstance } from "fastify";

const apiRoutes = (fastify: FastifyInstance) => {
  fastify.post<{ Body: IngestRequest, Reply: IngestResponse }>(
    "/ingest",
    { schema: ingestSchema },
    ingestHandler
  );
};

export default apiRoutes;
