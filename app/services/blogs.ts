import { db } from "@/db";
import { blogs } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export const getBlogs = async (query?: string) => {
  if (query) {
    return db.query.blogs.findMany({
      where: (blog, { sql }) => sql`${blog.title} ILIKE ${`%${query}%`}`,
    });
  }

  return db.query.blogs.findMany();
};

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  });
};

export const addBlog = async (title: string, author: string, url: string) => {
  const user = await db.query.users.findFirst({
    orderBy: sql`RANDOM()`,
  });

  return db.insert(blogs).values({ title, author, url, likes: 0, userId: user!.id });
};

export const likeBlog = async (id: number) => {
  const blog = await getBlogById(id);
  if (blog) {
    return db
      .update(blogs)
      .set({ likes: blog.likes + 1 })
      .where(eq(blogs.id, id));
  }
};
