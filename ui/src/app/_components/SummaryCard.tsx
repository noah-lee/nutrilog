import { useGetActivityLogs } from "@/api/nutrition/activities/hooks";
import { useGetFoodLogs } from "@/api/nutrition/foods/hooks";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Progress } from "@/components/Progress";
import { Skeleton } from "@/components/Skeleton";
import { BeefIcon, DumbbellIcon, UtensilsIcon } from "lucide-react";
import { useMemo, useState } from "react";

const SummaryCard = () => {
  const [calorieTarget, setCalorieTarget] = useState(1500);
  const [proteinTarget, setProteinTarget] = useState(100);

  const { data: foodLogs, isLoading: isLoadingFoodLogs } = useGetFoodLogs();
  const { data: activityLogs, isLoading: isLoadingActivityLogs } =
    useGetActivityLogs();

  const isLoading = isLoadingFoodLogs || isLoadingActivityLogs;

  const foodTotal = useMemo(
    () => foodLogs?.reduce((sum, log) => (sum += log.calories), 0) ?? 0,
    [foodLogs]
  );

  const activityTotal = useMemo(
    () => activityLogs?.reduce((sum, log) => (sum += log.calories), 0) ?? 0,
    [activityLogs]
  );

  const total = useMemo(
    () => foodTotal - activityTotal * 0.5,
    [foodTotal, activityTotal]
  );

  const proteinTotal = useMemo(
    () => foodLogs?.reduce((sum, log) => (sum += log.protein), 0) ?? 0,
    [foodLogs]
  );

  const calorieOffset = calorieTarget - total;
  const proteinOffset = proteinTarget - proteinTotal;

  return (
    <Card className="p-4 w-[280px]">
      {isLoading ? (
        <Skeleton className="w-full h-[166px]" />
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <p className="font-semibold text-sm">CALORIES</p>
            <div className="flex items-center">
              <p className="font-bold text-4xl">{total}</p>
              <p className="text-muted-foreground self-end">/{calorieTarget}</p>
            </div>
          </div>
          <Progress value={(total / calorieTarget) * 100} className="h-3"/>
          <div className="flex gap-2 flex-wrap">
            <Badge className="rounded-xl">
              <UtensilsIcon size={8} className="shrink-0" />+{foodTotal} cal
            </Badge>
            <Badge className="rounded-xl">
              <DumbbellIcon size={8} className="shrink-0" />-
              {activityTotal * 0.5} cal
            </Badge>
            <Badge className="rounded-xl">
              <BeefIcon size={8} className="shrink-0" />
              {proteinTotal} g
            </Badge>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">
              {calorieOffset > 0
                ? `You still have room for ${calorieOffset} cal 😋`
                : "You hit your daily calorie target 🎯"}
            </p>
            <p className="text-xs text-muted-foreground">
              {proteinOffset > 0
                ? `You are ${proteinOffset} g away from your protein goal 🍖`
                : "You met your protein goal! Good job 💪"}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default SummaryCard;
