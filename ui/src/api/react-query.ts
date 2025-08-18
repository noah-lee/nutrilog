import type { ApiError } from "@/api/axios";
import {
  QueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: (failureCount: number, error: unknown) => {
        if ((error as ApiError)?.statusCode === 401) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});

export type UseTypedQueryOptions<Response> = Omit<
  UseQueryOptions<Response, Error>,
  "queryKey" | "queryFn"
>;

export type UseTypedMutationOptions<Response, Request> = Omit<
  UseMutationOptions<Response, Error, Request>,
  "mutationFn"
>;
