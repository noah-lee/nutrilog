import { Generated } from "kysely";

export interface Database {
  food_logs: {
    id: Generated<number>;
    description: string;
    calories: number;
    protein: number;
    created_at: Generated<Date>;
  };
  activity_logs: {
    id: Generated<number>;
    description: string;
    calories: number;
    created_at: Generated<Date>;
  };
}
