"use server";

import { redirect } from "next/navigation";
import { addBlog, likeBlog } from "../services/blogs";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { LOGIN_PATH } from "../constants";

export type BlogFormState = {
  errors: {
    title?: string;
    author?: string;
    url?: string;
  };
  values: {
    title?: string;
    author?: string;
    url?: string;
  };
  success: boolean;
};

export const createBlog = async (
  prevState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> => {
  const session = await auth();
  if (!session) {
    redirect(LOGIN_PATH);
  }

  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  const errors: BlogFormState["errors"] = {};

  // Validate that title, author and url are present and all have minimum length of 5 characters
  if (!title || title.length < 5) {
    errors["title"] = "Title is required and must be at least 5 characters long";
  }
  if (!author || author.length < 5) {
    errors["author"] = "Author is required and must be at least 5 characters long";
  }
  if (!url || url.length < 5) {
    errors["url"] = "URL is required and must be at least 5 characters long";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { title, author, url }, success: false };
  }

  await addBlog(title, author, url);
  revalidatePath("/blogs");
  return { errors: {}, values: {}, success: true };
};

export const likeBlogAction = async (formData: FormData) => {
  const id = Number(formData.get("id"));

  await likeBlog(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};
