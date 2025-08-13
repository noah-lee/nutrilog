import { ActivityLogInsert } from "@/api/nutrition/activities/types";

export const isActivityLog = (value: unknown): value is ActivityLogInsert => {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as ActivityLogInsert).description === "string" &&
    typeof (value as ActivityLogInsert).calories === "number"
  );
};
