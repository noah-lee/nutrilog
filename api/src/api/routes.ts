import { FastifyInstance } from "fastify";
import nutritionRoutes from "@/api/nutrition/routes";
import authRoutes from "@/api/auth/routes";
import db from "@/db/config";
import { sql } from "kysely";

const apiRoutes = (fastify: FastifyInstance) => {
  fastify.get("/time", async (_, reply) => {
    const res = await db.executeQuery(sql`SELECT NOW() AS now`.compile(db));
    return reply.status(200).send(res);
  });

  fastify.register(nutritionRoutes, {
    prefix: "/nutrition",
  });
  fastify.register(authRoutes, { prefix: "/auth" });
};

export default apiRoutes;
