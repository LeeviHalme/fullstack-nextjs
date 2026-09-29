import { db } from "@/db";

export const getReadingListItemsByUserId = async (userId: number) => {
  return db.query.readingLists.findMany({
    where: (readingList, { eq }) => eq(readingList.userId, userId),
    with: {
      blog: true,
    },
  });
};

export const isInReadingList = async (userId: number, blogId: number) => {
  const item = await db.query.readingLists.findFirst({
    where: (readingList, { and, eq }) =>
      and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)),
  });
  return !!item;
};
