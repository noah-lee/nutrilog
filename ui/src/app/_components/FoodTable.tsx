import type { FoodLog } from "@/api/nutrition/foods/types";
import { Skeleton } from "@/components/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";
import { BeefIcon, UtensilsIcon, ZapIcon } from "lucide-react";
import type { FC } from "react";

interface Props {
  logs?: FoodLog[];
}

const FoodTable: FC<Props> = ({ logs }) => {
  const isLoading = !logs;

  return (
    <div className="@container h-[240px] min-w-[240px] flex-1 flex flex-col border rounded-xl">
      <Table className="border-collapse table-fixed">
        <TableHeader className="sticky top-0 z-10 bg-secondary">
          <TableRow>
            <TableHead className="w-[50%] rounded-tl-xl">
              <div className="flex gap-2 items-center">
                <UtensilsIcon size={16} className="shrink-0" />
                <p className="invisible @sm:visible">Food</p>
              </div>
            </TableHead>
            <TableHead className="w-[25%]">
              <div className="flex gap-2 items-center">
                <BeefIcon size={16} className="shrink-0" />
                <p className="invisible @sm:visible">Protein</p>
              </div>
            </TableHead>
            <TableHead className="w-[25%] rounded-tr-xl">
              <div className="flex gap-2 items-center">
                <ZapIcon size={16} className="shrink-0" />
                <p className="invisible @sm:visible">Calories</p>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <div className="flex-grow overflow-y-auto scrollbar-hidden">
        <Table className="border-collapse table-fixed">
          <TableBody>
            {isLoading
              ? new Array(2).fill(null).map((_, index) => (
                  <TableRow
                    key={`skeleton-${index}`}
                    className="border-0 hover:bg-transparent"
                  >
                    <TableCell colSpan={3}>
                      <Skeleton className="h-8" />
                    </TableCell>
                  </TableRow>
                ))
              : logs.map((log) => (
                  <TableRow key={log.id} className="h-8">
                    <TableCell
                      title={log.description}
                      className="truncate w-[50%]"
                    >
                      {log.description}
                    </TableCell>
                    <TableCell className="w-[25%]">{log.protein}</TableCell>
                    <TableCell className="w-[25%]">{log.calories}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
      <Table className="border-collapse table-fixed">
        <TableFooter className="sticky bottom-0 z-10 bg-background">
          {isLoading ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={3}>
                <Skeleton className="h-8" />
              </TableCell>
            </TableRow>
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell className="w-[50%] rounded-bl-xl">Total</TableCell>
              <TableCell className="w-[25%]">
                {logs.reduce((sum, log) => (sum += log.protein), 0)}
              </TableCell>
              <TableCell className="w-[25%] rounded-br-xl">
                {logs.reduce((sum, log) => (sum += log.calories), 0)}
              </TableCell>
            </TableRow>
          )}
        </TableFooter>
      </Table>
    </div>
  );
};

export default FoodTable;
