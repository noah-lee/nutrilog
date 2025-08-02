import { connectToDB } from "@/config/db";
import {
  OPENAI_API_KEY,
  OPENAI_API_URL,
  OPENAI_MAX_TOKENS,
  OPENAI_MODEL,
  OPENAI_SYSTEM_PROMPT,
} from "@/config/openai";
import Fastify from "fastify";

const fastify = Fastify({ logger: true });

fastify.get("/", async function (_, reply) {
  return reply.status(200).send("OK");
});

fastify.post("/parse", async (request, reply) => {
  const { text } = request.body as { text: string };

  if (!text || text.trim().length === 0) {
    return reply.status(400).send({ error: "Text is required" });
  }

  const messages = [
    { role: "system", content: OPENAI_SYSTEM_PROMPT },
    { role: "user", content: text },
  ];

  try {
    const res = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages,
        temperature: 0,
        max_tokens: OPENAI_MAX_TOKENS,
      }),
    });

    const data = await res.json();

    return reply.send({
      data: data,
    });
  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: "Internal server error" });
  }
});

const start = async () => {
  try {
    await connectToDB();
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
