import { api } from "@/api/axios";
import type {
  DeleteActivityLogRequest,
  DeleteActivityLogResponse,
  GetActivityLogsQueries,
  GetActivityLogsResponse,
  UpdateActivityLogRequest,
  UpdateActivityLogResponse,
} from "@/api/nutrition/activities/types";
import type {
  UseTypedMutationOptions,
  UseTypedQueryOptions,
} from "@/api/react-query";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export const useGetActivityLogs = (
  params?: GetActivityLogsQueries,
  options?: UseTypedQueryOptions<GetActivityLogsResponse>
) => {
  return useQuery({
    queryKey: ["activityLogs", params],
    queryFn: () =>
      api<GetActivityLogsResponse>("/nutrition/activities", { params }),
    ...options,
  });
};

export const useUpdateActivityLog = (
  client: QueryClient,
  options?: UseTypedMutationOptions<
    UpdateActivityLogResponse,
    UpdateActivityLogRequest
  >
) => {
  return useMutation({
    mutationFn: ({ params, data }) =>
      api<UpdateActivityLogResponse>(`/nutrition/activities/${params.id}`, {
        method: "PATCH",
        data,
      }),
    ...options,
    onSuccess: (...args) => {
      options?.onSuccess?.(...args);
      client.invalidateQueries({ queryKey: ["activityLogs"] });
    },
  });
};

export const useDeleteActivityLog = (
  client: QueryClient,
  options?: UseTypedMutationOptions<
    DeleteActivityLogResponse,
    DeleteActivityLogRequest
  >
) => {
  return useMutation({
    mutationFn: ({ params }) =>
      api<DeleteActivityLogResponse>(`/nutrition/activities/${params.id}`, {
        method: "DELETE",
      }),
    ...options,
    onSuccess: (...args) => {
      options?.onSuccess?.(...args);
      client.invalidateQueries({ queryKey: ["activityLogs"] });
    },
  });
};
