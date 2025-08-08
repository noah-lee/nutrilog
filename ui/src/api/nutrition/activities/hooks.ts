import { api } from "@/api/axios";
import type {
  DeleteActivityLogRequest,
  DeleteActivityLogResponse,
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
  options?: UseTypedQueryOptions<GetActivityLogsResponse>
) => {
  return useQuery({
    queryKey: ["activityLogs"],
    queryFn: () => api<GetActivityLogsResponse>("/nutrition/activities"),
    ...options,
  });
};

export const useUpdateActivityLog = (
  client: QueryClient,
  options?: UseTypedMutationOptions<UpdateActivityLogResponse, UpdateActivityLogRequest>
) => {
  return useMutation({
    mutationFn: ({ params, data }) =>
      api<UpdateActivityLogResponse>(`/nutrition/activities/${params.id}`, {
        method: "PATCH",
        data,
      }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["activityLogs"] });
    },
    ...options,
  });
};

export const useDeleteActivityLog = (
  client: QueryClient,
  options?: UseTypedMutationOptions<DeleteActivityLogResponse, DeleteActivityLogRequest>
) => {
  return useMutation({
    mutationFn: ({ params }) =>
      api<DeleteActivityLogResponse>(`/nutrition/activities/${params.id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["activityLogs"] });
    },
    ...options,
  });
};
