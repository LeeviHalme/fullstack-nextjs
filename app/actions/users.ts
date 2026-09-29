"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { LOGIN_PATH } from "../constants";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "../services/session";
import { revalidatePath } from "next/cache";

export const registerUser = async (
  prevState: { errors: { [key: string]: string }; values: { [key: string]: string } },
  formData: FormData,
) => {
  const username = (formData.get("username") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;

  const errors: { [key: string]: string } = {};

  // Validate that username and password are present and have minimum length of 4 characters
  if (!username || username.length < 4) {
    errors["username"] = "Username is required and must be at least 4 characters long";
  }
  if (!name) {
    errors["name"] = "Name is required";
  }
  if (!password || password.length < 4) {
    errors["password"] = "Password is required and must be at least 4 characters long";
  }
  if (password !== passwordConfirm) {
    errors["passwordConfirm"] = "Passwords do not match";
  }

  const existingUser = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.username, username),
  });

  if (existingUser) {
    errors["username"] = "Username is already taken";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name, password } };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({ username, name, passwordHash });

  redirect(LOGIN_PATH);
};

export const generateApiToken = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const token = crypto.randomUUID();

  await db.update(users).set({ apiToken: token }).where(eq(users.id, user.id));
  revalidatePath("/me");
};
