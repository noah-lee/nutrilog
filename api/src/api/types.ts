import { Generated } from "kysely";

export interface Database {
  food_logs: {
    id: Generated<number>;
    description: string;
    calories: number;
    protein: number;
    embedding: string | null;
    created_at: Generated<Date>;
  };
  activity_logs: {
    id: Generated<number>;
    description: string;
    calories: number;
    embedding: string | null;
    created_at: Generated<Date>;
  };
}
