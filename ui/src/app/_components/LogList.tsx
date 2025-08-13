import { useGetActivityLogs } from "@/api/nutrition/activities/hooks";
import { useGetFoodLogs } from "@/api/nutrition/foods/hooks";
import LogItem from "@/app/_components/LogItem";
import { useMemo } from "react";
import type { Log } from "@/app/App.types";
import { Skeleton } from "@/components/Skeleton";
import { formatISODateTime, getEndDate, getStartDate } from "@/utils/dates";

const LogList = () => {
  const queries = {
    start: formatISODateTime(getStartDate()),
    end: formatISODateTime(getEndDate()),
  };

  const { data: foodLogs, isLoading: isLoadingFoodLogs } =
    useGetFoodLogs(queries);
  const { data: activityLogs, isLoading: isLoadingActivityLogs } =
    useGetActivityLogs(queries);

  const isLoading = isLoadingFoodLogs || isLoadingActivityLogs;

  const logs: Log[] = useMemo(
    () =>
      [...(foodLogs ?? []), ...(activityLogs ?? [])].sort((a, b) =>
        b.created_at.localeCompare(a.created_at)
      ),
    [foodLogs, activityLogs]
  );

  return (
    <div className="w-full flex flex-col gap-4">
      <p className="font-semibold text-muted-foreground">Today, you've added:</p>
      <div className="flex flex-col w-full [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-border">
        {isLoading
          ? Array(5)
              .fill(null)
              .map((_, index) => (
                <div key={`skeleton-${index}`} className="p-2">
                  <Skeleton className="w-full h-[47px]" />
                </div>
              ))
          : logs.map((log, index) => (
              <LogItem key={`log-${index}`} log={log} />
            ))}
      </div>
    </div>
  );
};

export default LogList;
