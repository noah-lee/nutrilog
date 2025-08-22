import { Generated } from "kysely";

export interface Database {
  food_logs: {
    id: Generated<number>;
    user_id: string;
    description: string;
    calories: number;
    protein: number;
    created_at: Generated<Date>;
  };
  activity_logs: {
    id: Generated<number>;
    user_id: string;
    description: string;
    calories: number;
    created_at: Generated<Date>;
  };
  users: {
    id: Generated<string>;
    email: string;
    name: string;
    calories: Generated<number>;
    protein: Generated<number>;
    age: number | null;
    sex: "male" | "female" | "other" | null;
    weight: number | null;
    height: number | null;
    created_at: Generated<Date>;
  };
}
