import type { GetAuthStatusResponse } from "@/api/auth/types";
import { api } from "@/api/axios";
import type { UseTypedQueryOptions } from "@/api/react-query";
import { useQuery } from "@tanstack/react-query";

export const useGetAuthStatus = (options?: UseTypedQueryOptions<GetAuthStatusResponse>) => {
  return useQuery({
    queryKey: ["auth-status"],
    queryFn: () => api<GetAuthStatusResponse>("/auth/status"),
    ...options,
  });
};
