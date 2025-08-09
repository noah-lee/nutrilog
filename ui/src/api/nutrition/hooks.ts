import { api } from "@/api/axios";
import type { IngestRequest, IngestResponse } from "@/api/nutrition/types";
import type { UseTypedMutationOptions } from "@/api/react-query";
import { useMutation, type QueryClient } from "@tanstack/react-query";

export const useIngestNutrition = (
  client: QueryClient,
  options?: UseTypedMutationOptions<IngestResponse, IngestRequest>
) => {
  return useMutation({
    mutationFn: ({ data }) =>
      api<IngestResponse>("/nutrition/ingest", {
        method: "POST",
        data,
      }),
    ...options,
    onSuccess: (...args) => {
      client.invalidateQueries({ queryKey: ["foodLogs"] });
      client.invalidateQueries({ queryKey: ["activityLogs"] });
      options?.onSuccess?.(...args);
    },
  });
};
