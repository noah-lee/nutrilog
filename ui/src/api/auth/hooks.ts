import type { GetAuthStatusResponse } from "@/api/auth/types";
import { api } from "@/api/axios";
import type { UseTypedQueryOptions } from "@/api/react-query";
import { useQuery } from "@tanstack/react-query";

export const useGetAuthStatus = (options?: UseTypedQueryOptions<GetAuthStatusResponse>) => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => api<GetAuthStatusResponse>("/auth/me"),
    ...options,
  });
};
