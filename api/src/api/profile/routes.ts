import { handleAuth } from "@/api/auth/handlers";
import { getUserService, updateUserService } from "@/api/profile/services";
import { User, UserUpdate } from "@/api/profile/types";
import { FastifyInstance } from "fastify";

const profileRoutes = (fastify: FastifyInstance) => {
  fastify.addHook("preHandler", handleAuth);

  fastify.get<{ Reply: User }>("/me", async (request, reply) => {
    const { userId } = request;

    if (!userId) {
      return reply.status(401).send();
    }

    const selectedUser = await getUserService(userId);

    return reply.send(selectedUser);
  });

  fastify.patch<{ Body: UserUpdate; Reply: User }>(
    "/me",
    async (request, reply) => {
      const { userId } = request;

      if (!userId) {
        return reply.status(401).send();
      }

      const updatedUser = await updateUserService(userId, request.body);

      return reply.send(updatedUser);
    }
  );
};

export default profileRoutes;
