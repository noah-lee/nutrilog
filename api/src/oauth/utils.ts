import { ProviderUser } from "@/oauth/types";

export const isProviderUser = (user: unknown): user is ProviderUser => {
  if (typeof user !== "object" || user === null) return false;
  const { email, name } = user as ProviderUser;
  return typeof email === "string" && typeof name === "string";
};
