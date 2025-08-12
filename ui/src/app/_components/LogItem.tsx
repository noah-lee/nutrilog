import type { FoodLog } from "@/api/nutrition/foods/types";
import type { Log } from "@/app/App.types";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { BeefIcon, DumbbellIcon, UtensilsIcon } from "lucide-react";
import { type FC } from "react";

interface Props {
  log: Log;
}

const LogItem: FC<Props> = ({ log }) => {
  return (
    <div className="flex gap-2 w-full justify-between p-2 h-[64px]">
      <div className="flex gap-2 items-center flex-3 overflow-hidden">
        <Button size="icon" className="rounded-full" variant="secondary">
          {isFoodLog(log) ? <UtensilsIcon /> : <DumbbellIcon />}
        </Button>
        <div className="overflow-hidden">
          <p className="font-semibold truncate">{log.description}</p>
          <p className="text-muted-foreground text-xs">
            {isFoodLog(log) ? "Food" : "Activity"}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end flex-1 shrink-0">
        <p className="font-semibold">
          {isFoodLog(log) ? "+" : "-"}
          {log.calories} cal
        </p>
        {isFoodLog(log) && (
          <Badge className="rounded-xl">
            <BeefIcon size={8} className="shrink-0" />
            {log.protein}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default LogItem;

const isFoodLog = (log: Log): log is FoodLog => {
  return "protein" in log;
};
