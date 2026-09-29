"use server";

import { db } from "@/db";
import { readingLists } from "@/db/schema";
import { isInReadingList } from "../services/readingLists";
import { getCurrentUser } from "../services/session";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { getBlogById } from "../services/blogs";

export const addToReadingListAction = async (formData: FormData) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const blogId = Number(formData.get("id"));
  const blog = await getBlogById(blogId);

  if (!blog) {
    throw new Error("Invalid blog ID");
  }

  const alreadyInReadingList = await isInReadingList(user.id, blogId);
  if (alreadyInReadingList) {
    throw new Error("Blog is already in the reading list");
  }

  await db.insert(readingLists).values({ userId: user.id, blogId });

  revalidatePath("/me");
  revalidatePath(`/blogs/${blogId}`);
};

export const markAsReadAction = async (formData: FormData) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const blogId = Number(formData.get("id"));
  const blog = await getBlogById(blogId);

  if (!blog) {
    throw new Error("Invalid blog ID");
  }

  const existingEntry = await db.query.readingLists.findFirst({
    where: and(eq(readingLists.userId, user.id), eq(readingLists.blogId, blogId)),
  });

  if (!existingEntry) {
    throw new Error("Blog is not in the reading list");
  }

  await db
    .update(readingLists)
    .set({ read: true })
    .where(and(eq(readingLists.userId, user.id), eq(readingLists.blogId, blogId)));

  revalidatePath("/me");
  revalidatePath(`/blogs/${blogId}`);
};
