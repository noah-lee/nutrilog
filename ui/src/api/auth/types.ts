export type User = {
  id: number;
  name: string;
  email: string;
  calories: number;
  protein: number;
  age: number | null;
  sex: "male" | "female" | "other" | null;
  weight: number | null;
  height: number | null;
  created_at: string;
};

export type GetAuthStatusResponse = User;
