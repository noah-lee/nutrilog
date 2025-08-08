import {
  deleteActivityLogSchema,
  updateActivityLogSchema,
} from "@/api/nutrition/activities/schemas";
import {
  deleteActivityLogService,
  getActivitiesService,
  updateActivityLogService,
} from "@/api/nutrition/activities/services";
import {
  GetActivitiesResponse,
  UpdateActivityLogBody,
  UpdateActivityLogResponse,
  UpdateActivityLogParams,
  DeleteActivityLogParams,
  DeleteActivityLogResponse,
} from "@/api/nutrition/activities/types";
import { FastifyInstance } from "fastify";

const activitiesRoutes = (fastify: FastifyInstance) => {
  fastify.get<{ Reply: GetActivitiesResponse }>("/", async (_, reply) => {
    const activityLogs = await getActivitiesService();
    return reply.status(200).send(activityLogs);
  });

  fastify.patch<{
    Params: UpdateActivityLogParams;
    Body: UpdateActivityLogBody;
    Reply: UpdateActivityLogResponse;
  }>("/:id", { schema: updateActivityLogSchema }, async (request, reply) => {
    const id = request.params.id;
    const updatedActivityLog = await updateActivityLogService(id, request.body);

    if (!updatedActivityLog) {
      return reply.status(404).send("Activity log entry not found");
    }

    return reply.status(200).send(updatedActivityLog);
  });

  fastify.delete<{
    Params: DeleteActivityLogParams;
    Reply: DeleteActivityLogResponse;
  }>("/:id", { schema: deleteActivityLogSchema }, async (request, reply) => {
    const id = request.params.id;
    const deletedActivityLog = await deleteActivityLogService(id);

    if (!deletedActivityLog) {
      return reply.status(404).send("Activity log entry not found");
    }

    return reply.status(200).send(deletedActivityLog);
  });
};

export default activitiesRoutes;
