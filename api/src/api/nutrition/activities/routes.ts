import {
  deleteActivityLogSchema,
  getActivityLogsSchema,
  updateActivityLogSchema,
} from "@/api/nutrition/activities/schemas";
import {
  deleteActivityLogService,
  getActivityLogsService,
  updateActivityLogService,
} from "@/api/nutrition/activities/services";
import {
  GetActivitiesResponse,
  UpdateActivityLogBody,
  UpdateActivityLogResponse,
  UpdateActivityLogParams,
  DeleteActivityLogParams,
  DeleteActivityLogResponse,
  GetActivityQueries,
} from "@/api/nutrition/activities/types";
import { FastifyInstance } from "fastify";

const activitiesRoutes = (fastify: FastifyInstance) => {
  fastify.get<{
    Reply: GetActivitiesResponse;
    Querystring: GetActivityQueries;
  }>("/", { schema: getActivityLogsSchema }, async (request, reply) => {
    const { start, end } = request.query;

    const startDate = start ? new Date(start) : undefined;
    const endDate = end ? new Date(end) : undefined;

    const activityLogs = await getActivityLogsService(startDate, endDate);
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
