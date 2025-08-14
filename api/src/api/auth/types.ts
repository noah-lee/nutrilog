import { Database } from "@/api/types";
import { Selectable } from "kysely";

type UserTable = Database["users"];

export type User = Selectable<UserTable>;