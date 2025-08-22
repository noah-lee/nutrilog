import { useUpdateMe } from "@/api/profile/hooks";
import { useGetActivityLogs } from "@/api/nutrition/activities/hooks";
import { useGetFoodLogs } from "@/api/nutrition/foods/hooks";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Progress } from "@/components/Progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/Sheet";
import { Skeleton } from "@/components/Skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useIsMobile } from "@/hooks/useIsMobile";
import { sumBy } from "@/utils/arrays";
import { formatISODateTime, getEndDate, getStartDate } from "@/utils/dates";
import { convertStringToPositiveInteger } from "@/utils/numbers";
import { cn } from "@/utils/styles";
import { useQueryClient } from "@tanstack/react-query";
import { BeefIcon, DumbbellIcon, Edit2Icon, UtensilsIcon } from "lucide-react";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";

const DESELECT_SEX = "none";

const SummaryCard = () => {
  const client = useQueryClient();
  const { me } = useAuth();

  const isMobile = useIsMobile();

  const queries = {
    start: formatISODateTime(getStartDate()),
    end: formatISODateTime(getEndDate()),
  };

  const [open, setOpen] = useState(false);

  const initialCalorieTarget = me!.calories.toString();
  const initialProteinTarget = me!.protein.toString();
  const initialAge = me!.age?.toString() ?? "";
  const initialWeight = me!.weight?.toString() ?? "";
  const initialHeight = me!.height?.toString() ?? "";
  const initialSex = me!.sex ?? null;

  const [calorieTarget, setCalorieTarget] = useState(initialCalorieTarget);
  const [proteinTarget, setProteinTarget] = useState(initialProteinTarget);
  const [age, setAge] = useState(initialAge);
  const [weight, setWeight] = useState(initialWeight);
  const [height, setHeight] = useState(initialHeight);
  const [sex, setSex] = useState<"male" | "female" | "other" | null>(
    initialSex
  );

  const isValid = !!calorieTarget && !!proteinTarget;

  const { mutate: updateMe, isPending: isPendingUpdateMe } = useUpdateMe(
    client,
    {
      onSuccess: () => {
        setOpen(false);
      },
    }
  );

  const { data: foodLogs, isLoading: isLoadingFoodLogs } =
    useGetFoodLogs(queries);
  const { data: activityLogs, isLoading: isLoadingActivityLogs } =
    useGetActivityLogs(queries);

  const isLoading =
    isLoadingFoodLogs || isLoadingActivityLogs || isPendingUpdateMe;

  const foodCaloriesTotal = useMemo(
    () => sumBy(foodLogs ?? [], "calories"),
    [foodLogs]
  );

  const activityCaloriesTotal = useMemo(
    () => sumBy(activityLogs ?? [], "calories"),
    [activityLogs]
  );

  const caloriesTotal = useMemo(
    () => foodCaloriesTotal - activityCaloriesTotal * 0.5,
    [foodCaloriesTotal, activityCaloriesTotal]
  );

  const proteinTotal = useMemo(
    () => sumBy(foodLogs ?? [], "protein"),
    [foodLogs]
  );

  const calorieOffset = Number(calorieTarget) - caloriesTotal;
  const proteinOffset = Number(proteinTarget) - proteinTotal;

  const handleCalorieTargetChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    setCalorieTarget(convertStringToPositiveInteger(input));
  };

  const handleProteinTargetChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    setProteinTarget(convertStringToPositiveInteger(input));
  };

  const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    setAge(convertStringToPositiveInteger(input));
  };

  const handleWeightChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    setWeight(convertStringToPositiveInteger(input));
  };

  const handleHeightChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    setHeight(convertStringToPositiveInteger(input));
  };

  const handleSexChange = (
    value: "male" | "female" | "other" | typeof DESELECT_SEX
  ) => {
    setSex(value === DESELECT_SEX ? null : value);
  };

  const handleReset = () => {
    setCalorieTarget(initialCalorieTarget);
    setProteinTarget(initialProteinTarget);
    setAge(initialAge);
    setWeight(initialWeight);
    setHeight(initialHeight);
    setSex(initialSex);
  };

  const handleSave = () => {
    if (!isValid) {
      return;
    }

    updateMe({
      data: {
        calories: +calorieTarget,
        protein: +proteinTarget,
        age: age ? +age : null,
        weight: weight ? +weight : null,
        height: height ? +height : null,
        sex,
      },
    });
  };

  useEffect(() => {
    handleReset();
  }, [me]);

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        handleReset();
        setOpen(open);
      }}
    >
      <Card
        className={cn(
          "flex-1 p-4 w-full min-w-[280px]",
          !isMobile && "self-start"
        )}
      >
        {isLoading ? (
          <Skeleton className="w-full h-[166px]" />
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="font-semibold text-sm">CALORIES</p>
                <div className="flex items-center">
                  <p className="font-bold text-4xl">{caloriesTotal}</p>
                  <p className="text-muted-foreground self-end">
                    /{calorieTarget}
                  </p>
                </div>
              </div>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Edit2Icon />
                </Button>
              </SheetTrigger>
            </div>
            <Progress
              value={(caloriesTotal / Number(calorieTarget)) * 100}
              className="h-3"
            />
            <div className="flex gap-2 flex-wrap">
              <Badge className="rounded-xl">
                <UtensilsIcon size={8} className="shrink-0" />+
                {foodCaloriesTotal} cal
              </Badge>
              <Badge className="rounded-xl">
                <DumbbellIcon size={8} className="shrink-0" />-
                {activityCaloriesTotal * 0.5} cal
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
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={cn(isMobile ? "h-[80%]" : "h-[100%]", "overflow-y-auto")}
      >
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Update your calorie and protein goals, and personal details (age,
            sex, weight, height). Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 justify-between px-4">
          <div className="flex flex-col gap-4">
            <h3>Your daily goal</h3>
            <div className="flex flex-col gap-2">
              <Label htmlFor="calorieTarget">Calories (cal)</Label>
              <Input
                id="calorieTarget"
                type="text"
                value={calorieTarget}
                onChange={handleCalorieTargetChange}
                disabled={isLoading}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="proteinTarget">Protein (g)</Label>
              <Input
                id="proteinTarget"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={proteinTarget}
                onChange={handleProteinTargetChange}
                disabled={isLoading}
              />
            </div>
            <h3>
              About you{" "}
              <span className="text-muted-foreground">(optional)</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={age}
                  onChange={handleAgeChange}
                  disabled={isLoading}
                  placeholder="e.g. 25"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="sex">Sex</Label>
                <Select value={sex ?? ""} onValueChange={handleSexChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem
                      value={DESELECT_SEX}
                      className="text-muted-foreground italic"
                    >
                      Prefer not to say
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="weight">Weight  (kg)</Label>
                <Input
                  id="weight"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={weight}
                  onChange={handleWeightChange}
                  disabled={isLoading}
                  placeholder="e.g. 80 kg"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={height}
                  onChange={handleHeightChange}
                  disabled={isLoading}
                  placeholder="e.g. 175 cm"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 justify-end items-center p-4 mt-auto">
          <Button
            variant="secondary"
            onClick={() => {
              handleReset();
              setOpen(false);
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button disabled={!isValid || isLoading} onClick={handleSave}>
            Save
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SummaryCard;
