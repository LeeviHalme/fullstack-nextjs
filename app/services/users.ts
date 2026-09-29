import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

export const getAllUsers = async () => {
  return db.query.users.findMany();
};

export const getUserById = async (id: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  });
};

export const getUserByApiToken = async (apiToken: string) => {
  return db.query.users.findFirst({
    where: eq(users.apiToken, apiToken),
    columns: {
      id: true,
      username: true,
      name: true,
    },
    with: {
      blogs: true,
    },
  });
};

export const getUserAndBlogsByUsername = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: {
      blogs: true,
    },
  });
};
