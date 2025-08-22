import type {
  GetMeResponse,
  UpdateMeRequest,
  UpdateMeResponse,
} from "@/api/profile/types";
import { api } from "@/api/axios";
import type {
  UseTypedMutationOptions,
  UseTypedQueryOptions,
} from "@/api/react-query";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export const useGetMe = (options?: UseTypedQueryOptions<GetMeResponse>) => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => api<GetMeResponse>("/profile/me"),
    ...options,
  });
};

export const useUpdateMe = (
  client: QueryClient,
  options?: UseTypedMutationOptions<UpdateMeResponse, UpdateMeRequest>
) => {
  return useMutation({
    mutationFn: ({ data }) =>
      api<UpdateMeResponse>("/profile/me", { method: "PATCH", data }),
    ...options,
    onSuccess: (...args) => {
      client.invalidateQueries({ queryKey: ["me"] });
      options?.onSuccess?.(...args);
    }
  });
};
