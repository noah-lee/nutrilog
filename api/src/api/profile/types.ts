import { Database } from "@/api/types";
import { Selectable, Updateable } from "kysely";

type UserTable = Database["users"];

export type User = Selectable<UserTable>;

export type UserUpdate = Omit<
  Updateable<UserTable>,
  "id" | "email" | "name" | "created_at"
>;
