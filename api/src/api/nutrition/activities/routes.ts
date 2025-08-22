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
  ActivityLog,
  ActivityLogUpdate,
} from "@/api/nutrition/activities/types";
import { StartEndQueries } from "@/api/nutrition/types";
import { FastifyInstance } from "fastify";

const activitiesRoutes = (fastify: FastifyInstance) => {
  fastify.get<{
    Querystring: StartEndQueries;
    Reply: ActivityLog[];
  }>("/", { schema: getActivityLogsSchema }, async (request, reply) => {
    const { start, end } = request.query;
    const userId = request.userId!;
    const startDate = start ? new Date(start) : undefined;
    const endDate = end ? new Date(end) : undefined;
    const activityLogs = await getActivityLogsService(
      userId,
      startDate,
      endDate
    );
    return reply.status(200).send(activityLogs);
  });

  fastify.patch<{
    Params: { id: number };
    Body: ActivityLogUpdate;
    Reply: ActivityLog;
  }>("/:id", { schema: updateActivityLogSchema }, async (request, reply) => {
    const userId = request.userId!;
    const activityId = request.params.id;
    const updatedActivityLog = await updateActivityLogService(
      userId,
      activityId,
      request.body
    );
    return reply.status(200).send(updatedActivityLog);
  });

  fastify.delete<{
    Params: { id: number };
    Reply: ActivityLog;
  }>("/:id", { schema: deleteActivityLogSchema }, async (request, reply) => {
    const userId = request.userId!;
    const activityId = request.params.id;
    const deletedActivityLog = await deleteActivityLogService(userId, activityId);
    return reply.status(200).send(deletedActivityLog);
  });
};

export default activitiesRoutes;
