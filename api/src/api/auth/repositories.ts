import { ProviderUser } from "@/oauth/types";
import db from "@/db/config";
import { ApiError } from "@/utils/errors";

export const getOrInsertUser = async (providerUser: ProviderUser) => {
  const [existingUser] = await db
    .selectFrom("users")
    .selectAll()
    .where("email", "=", providerUser.email)
    .execute();

  if (existingUser) {
    return existingUser;
  }

  const [insertedUser] = await db
    .insertInto("users")
    .values(providerUser)
    .returningAll()
    .execute();

  return insertedUser;
};

export const getUserById = async (id: string) => {
  const [user] = await db
    .selectFrom("users")
    .selectAll()
    .where("id", "=", id)
    .execute();

  return user ?? null;
};
