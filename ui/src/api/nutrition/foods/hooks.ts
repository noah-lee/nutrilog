import { api } from "@/api/axios";
import type {
  DeleteFoodLogRequest,
  DeleteFoodLogResponse,
  GetFoodLogsQueries,
  GetFoodLogsResponse,
  UpdateFoodLogRequest,
  UpdateFoodLogResponse,
} from "@/api/nutrition/foods/types";
import type {
  UseTypedMutationOptions,
  UseTypedQueryOptions,
} from "@/api/react-query";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export const useGetFoodLogs = (
  params?: GetFoodLogsQueries,
  options?: UseTypedQueryOptions<GetFoodLogsResponse>
) => {
  return useQuery({
    queryKey: ["foodLogs", params],
    queryFn: () => api<GetFoodLogsResponse>("/nutrition/foods", { params }),
    ...options,
  });
};

export const useUpdateFoodLog = (
  client: QueryClient,
  options?: UseTypedMutationOptions<UpdateFoodLogResponse, UpdateFoodLogRequest>
) => {
  return useMutation({
    mutationFn: ({ params, data }) =>
      api<UpdateFoodLogResponse>(`/nutrition/foods/${params.id}`, {
        method: "PATCH",
        data,
      }),
    ...options,
    onSuccess: (...args) => {
      client.invalidateQueries({ queryKey: ["foodLogs"] });
      options?.onSuccess?.(...args);
    },
  });
};

export const useDeleteFoodLog = (
  client: QueryClient,
  options?: UseTypedMutationOptions<DeleteFoodLogResponse, DeleteFoodLogRequest>
) => {
  return useMutation({
    mutationFn: ({ params }) =>
      api<DeleteFoodLogResponse>(`/nutrition/foods/${params.id}`, {
        method: "DELETE",
      }),
    ...options,
    onSuccess: (...args) => {
      options?.onSuccess?.(...args);
      client.invalidateQueries({ queryKey: ["foodLogs"] });
    },
  });
};
