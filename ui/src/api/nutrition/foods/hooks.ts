import { api } from "@/api/axios";
import type {
  DeleteFoodLogRequest,
  DeleteFoodLogResponse,
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
  options?: UseTypedQueryOptions<GetFoodLogsResponse>
) => {
  return useQuery({
    queryKey: ["foodLogs"],
    queryFn: () => api<GetFoodLogsResponse>("/nutrition/foods"),
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
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["foodLogs"] });
    },
    ...options,
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
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["foodLogs"] });
    },
    ...options,
  });
};
