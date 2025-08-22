import { FastifyInstance } from "fastify";
import nutritionRoutes from "@/api/nutrition/routes";
import authRoutes from "@/api/auth/routes";
import db from "@/db/config";
import { sql } from "kysely";
import profileRoutes from "@/api/profile/routes";

const apiRoutes = (fastify: FastifyInstance) => {
  fastify.get("/test", async (_, reply) => {
    const res = await db.executeQuery(sql`SELECT NOW() AS now`.compile(db));
    // const res = await db.selectFrom("users").selectAll().execute();
    return reply.status(200).send(res);
  });

  fastify.register(authRoutes, { prefix: "/auth" });
  fastify.register(profileRoutes, { prefix: "/profile" });
  fastify.register(nutritionRoutes, {
    prefix: "/nutrition",
  });
};

export default apiRoutes;
