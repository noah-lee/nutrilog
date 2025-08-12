import {
  useDeleteActivityLog,
  useUpdateActivityLog,
} from "@/api/nutrition/activities/hooks";
import {
  useDeleteFoodLog,
  useUpdateFoodLog,
} from "@/api/nutrition/foods/hooks";
import type { Log } from "@/app/App.types";
import { isFoodLog } from "@/app/App.utils";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/Sheet";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/utils/styles";
import { useQueryClient } from "@tanstack/react-query";
import {
  BeefIcon,
  CheckIcon,
  DumbbellIcon,
  TrashIcon,
  UtensilsIcon,
} from "lucide-react";
import { useState, type ChangeEvent, type FC } from "react";

interface Props {
  log: Log;
}

const LogItem: FC<Props> = ({ log }) => {
  const client = useQueryClient();
  const isMobile = useIsMobile();

  const isFood = isFoodLog(log);

  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState(log.description);
  const [calories, setCalories] = useState(log.calories.toString());
  const [protein, setProtein] = useState(isFood ? log.protein.toString() : "0");
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const isValid = !!description && !!+calories && (isFood ? !!+protein : true);

  const { mutate: updateFoodLog, isPending: isPendingUpdateFoodLog } =
    useUpdateFoodLog(client, {
      onSuccess: () => {
        handleReset();
        setOpen(false);
      },
    });

  const { mutate: updateActivityLog, isPending: isPendingUpdateActivityLog } =
    useUpdateActivityLog(client, {
      onSuccess: () => {
        handleReset();
        setOpen(false);
      },
    });

  const { mutate: deleteFoodLog, isPending: isPendingDeleteFoodLog } =
    useDeleteFoodLog(client, {
      onSuccess: () => {
        handleReset();
        setOpen(false);
      },
    });

  const { mutate: deleteActivityLog, isPending: isPendingDeleteActivityLog } =
    useDeleteActivityLog(client, {
      onSuccess: () => {
        handleReset();
        setOpen(false);
      },
    });

  const isLoading =
    isPendingUpdateFoodLog ||
    isPendingUpdateActivityLog ||
    isPendingDeleteFoodLog ||
    isPendingDeleteActivityLog;

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleCaloriesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    if (input === "") {
      setCalories("");
      return;
    }

    if (/^[1-9]\d*$/.test(input)) {
      setCalories(input);
    }
  };

  const handleProteinChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    if (input === "") {
      setCalories("");
      return;
    }

    if (/^[1-9]\d*$/.test(input)) {
      setProtein(input);
    }
  };

  const handleReset = () => {
    setDescription(log.description);
    setCalories(log.calories.toString());
    setProtein(isFood ? log.protein.toString() : "0");
    setDeleteConfirm(false);
  };

  const handleSave = () => {
    if (!isValid) {
      return;
    }

    if (isFood) {
      updateFoodLog({
        params: { id: log.id },
        data: {
          description,
          calories: +calories,
          protein: +protein,
        },
      });
    } else {
      updateActivityLog({
        params: { id: log.id },
        data: {
          description,
          calories: +calories,
        },
      });
    }
  };

  const initiateDelete = () => {
    setDeleteConfirm(true);
  };

  const handleDelete = () => {
    if (isFood) {
      deleteFoodLog({
        params: { id: log.id },
      });
    } else {
      deleteActivityLog({
        params: { id: log.id },
      });
    }
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        handleReset();
        setOpen(open);
      }}
    >
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="w-full h-[64px] p-2 flex gap-2 justify-between items-center rounded-none cursor-pointer"
        >
          <div className="min-w-0 flex-1 flex items-center gap-2">
            <div className="w-[36px] h-[36px] rounded-full pointer-events-none flex justify-center items-center bg-secondary">
              {isFood ? <UtensilsIcon /> : <DumbbellIcon />}
            </div>
            <div className="min-w-0 flex-1 flex flex-col">
              <p
                title={log.description}
                className="truncate text-left font-semibold"
              >
                {log.description}
              </p>
              <p className="text-muted-foreground text-xs text-left">
                {isFood ? "Food" : "Activity"}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="font-semibold">
              {isFood ? "+" : "-"}
              {log.calories} cal
            </p>
            {isFood && (
              <Badge className="rounded-xl">
                <BeefIcon size={8} className="shrink-0" />
                {log.protein}
              </Badge>
            )}
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={cn(isMobile ? "h-[80%]" : "h-[100%]")}
      >
        <SheetHeader>
          <SheetTitle>Edit {isFood ? "Food" : "Activity"} Entry</SheetTitle>
          <SheetDescription>
            Update your entry's details. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 justify-between px-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                value={description}
                onChange={handleDescriptionChange}
                disabled={isLoading}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="calories">Calories</Label>
              <Input
                id="calories"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={calories}
                onChange={handleCaloriesChange}
                disabled={isLoading}
              />
            </div>
            {isFood && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="protein">Protein</Label>
                <Input
                  id="protein"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={protein}
                  onChange={handleProteinChange}
                  disabled={isLoading}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-4 justify-between items-center p-4 mt-auto">
          <Button
            variant={deleteConfirm ? "destructive" : "outline"}
            onClick={deleteConfirm ? handleDelete : initiateDelete}
            disabled={isLoading}
          >
            {deleteConfirm ? <CheckIcon /> : <TrashIcon />}
          </Button>
          <div className="flex gap-4">
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
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default LogItem;
