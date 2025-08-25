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
        const statusCode = (error as ApiError)?.statusCode;
        if (statusCode === 401 || statusCode === 404) {
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
