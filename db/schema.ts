import { relations } from "drizzle-orm";
import { pgTable, serial, text, integer, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull().default(""),
  apiToken: text("api_token"),
});

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  url: text("url").notNull(),
  likes: integer("likes").notNull().default(0),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});

export const readingLists = pgTable("reading_lists", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  blogId: integer("blog_id")
    .notNull()
    .references(() => blogs.id),
  read: boolean("read").notNull().default(false),
});

export const readingListsRelations = relations(readingLists, ({ one }) => ({
  user: one(users, {
    fields: [readingLists.userId],
    references: [users.id],
  }),
  blog: one(blogs, {
    fields: [readingLists.blogId],
    references: [blogs.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
  readingLists: many(readingLists),
}));

export const readingListsWithBlogsRelations = relations(readingLists, ({ one }) => ({
  blog: one(blogs, {
    fields: [readingLists.blogId],
    references: [blogs.id],
  }),
}));

export const blogsRelations = relations(blogs, ({ one }) => ({
  user: one(users, {
    fields: [blogs.userId],
    references: [users.id],
  }),
}));
