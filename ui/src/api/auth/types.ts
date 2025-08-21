export type User = {
  id: number;
  name: string;
  email: string;
  calories: number;
  protein: number;
  weight: number;
  height: number;
  sex: "male" | "female" | "other";
  created_at: string;
};

export type GetAuthStatusResponse = User;
