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
import { StartEndQueries } from "@/api/nutrition/type";
import { FastifyInstance } from "fastify";

const activitiesRoutes = (fastify: FastifyInstance) => {
  fastify.get<{
    Querystring: StartEndQueries;
    Reply: ActivityLog[];
  }>("/", { schema: getActivityLogsSchema }, async (request, reply) => {
    const { start, end } = request.query;
    const user = request.user!;
    const startDate = start ? new Date(start) : undefined;
    const endDate = end ? new Date(end) : undefined;
    const activityLogs = await getActivityLogsService(
      user.id,
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
    const id = request.params.id;
    const user = request.user!;
    const updatedActivityLog = await updateActivityLogService(
      user.id,
      id,
      request.body
    );
    return reply.status(200).send(updatedActivityLog);
  });

  fastify.delete<{
    Params: { id: number };
    Reply: ActivityLog;
  }>("/:id", { schema: deleteActivityLogSchema }, async (request, reply) => {
    const id = request.params.id;
    const user = request.user!;
    const deletedActivityLog = await deleteActivityLogService(user.id, id);
    return reply.status(200).send(deletedActivityLog);
  });
};

export default activitiesRoutes;
