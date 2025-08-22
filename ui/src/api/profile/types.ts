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

export type GetMeResponse = User;

export type UpdateMeRequest = {
  data: Partial<
    Pick<User, "calories" | "protein" | "age" | "sex" | "weight" | "height">
  >;
};

export type UpdateMeResponse = User;
