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
