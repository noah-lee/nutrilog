import { useGetActivityLogs } from "@/api/nutrition/activities/hooks";
import { useGetFoodLogs } from "@/api/nutrition/foods/hooks";
import LogItem from "@/app/_components/LogItem";
import { useMemo } from "react";
import type { Log } from "@/app/App.types";
import { Skeleton } from "@/components/Skeleton";

const LogList = () => {
  const { data: foodLogs, isLoading: isLoadingFoodLogs } = useGetFoodLogs();
  const { data: activityLogs, isLoading: isLoadingActivityLogs } =
    useGetActivityLogs();

  const isLoading = isLoadingFoodLogs || isLoadingActivityLogs;

  const logs: Log[] = useMemo(
    () =>
      [...(foodLogs ?? []), ...(activityLogs ?? [])].sort((a, b) =>
        b.created_at.localeCompare(a.created_at)
      ),
    [foodLogs, activityLogs]
  );

  return (
    <div className="flex flex-col w-full [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-border">
      {isLoading
        ? Array(5)
            .fill(null)
            .map((_, index) => (
              <div key={`skeleton-${index}`} className="p-2">
                <Skeleton className="w-full h-[47px]" />
              </div>
            ))
        : logs.map((log) => <LogItem log={log} />)}
    </div>
  );
};

export default LogList;
