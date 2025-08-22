import { ProviderUser } from "@/oauth/types";
import db from "@/db/config";
import { UserUpdate } from "@/api/profile/types";

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

export const updateUserById = async (id: string, data: UserUpdate) => {
  const [updatedUser] = await db
    .updateTable("users")
    .set(data)
    .where("id", "=", id)
    .returningAll()
    .execute();

  return updatedUser ?? null;
};
