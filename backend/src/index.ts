import { dbConnect, db } from "@/config/db";
import Fastify from "fastify";

const fastify = Fastify({ logger: true });

fastify.get("/", async function (request, reply) {
  try {
    const res = await db.query("SELECT NOW() as time");
    reply.send({ time: res.rows[0].time });
  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: "Database error" });
  }
});

const start = async () => {
  try {
    await dbConnect();
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
