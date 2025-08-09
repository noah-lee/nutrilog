import type { ActivityLog } from "@/api/nutrition/activities/types";
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
import type { FC } from "react";

interface Props {
  logs?: ActivityLog[];
}

const ActivityTable: FC<Props> = ({ logs }) => {
  const isLoading = !logs;

  return (
    <div className="h-[240px] w-full flex flex-col border rounded-xl">
      <Table className="border-collapse table-fixed">
        <TableHeader className="sticky top-0 z-10 bg-secondary ">
          <TableRow>
            <TableHead className="w-[75%] rounded-tl-xl">Description</TableHead>
            <TableHead className="w-[25%] rounded-tr-xl">Calories</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <div className="flex-grow overflow-y-auto">
        <Table className="border-collapse table-fixed">
          <TableBody>
            {isLoading
              ? new Array(10).fill(null).map((_, index) => (
                  <TableRow key={`skeleton-${index}`} className="border-0 hover:bg-transparent">
                    <TableCell colSpan={3}>
                      <Skeleton className="h-8" />
                    </TableCell>
                  </TableRow>
                ))
              : logs.map((log) => (
                  <TableRow key={log.id} className="h-8">
                    <TableCell
                      title={log.description}
                      className="truncate w-[75%]"
                    >
                      {log.description}
                    </TableCell>
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
              <TableCell className="w-[75%] rounded-bl-xl">Total</TableCell>
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

export default ActivityTable;
