import { likeBlogAction } from "@/app/actions/blogs";
import { addToReadingListAction } from "@/app/actions/readingLists";
import { getBlogById } from "@/app/services/blogs";
import { isInReadingList } from "@/app/services/readingLists";
import { getCurrentUser } from "@/app/services/session";
import { notFound } from "next/navigation";

interface BlogPageProps {
  params: Promise<{ id: string }>;
}

async function BlogPage({ params }: BlogPageProps) {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) {
    return notFound();
  }

  const user = await getCurrentUser();
  const canAddToReadingList = (user && !(await isInReadingList(user.id, blog.id))) || false;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
      <div className="space-y-2">
        <div className="grid grid-cols-2">
          <b>Author:</b>
          <p>{blog.author}</p>
        </div>
        <div className="grid grid-cols-2">
          <b>URL:</b>
          <a
            href={blog.url}
            className="hover:text-gray-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer">
            {blog.url}
          </a>
        </div>
        <div className="grid grid-cols-2">
          <b>Likes:</b>
          <div className="flex items-center gap-2">
            <p className="text-amber-500">{blog.likes}</p>
            <form action={likeBlogAction}>
              <input type="hidden" name="id" value={blog.id} />
              <button
                type="submit"
                className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm cursor-pointer">
                Like
              </button>
            </form>
            {canAddToReadingList && (
              <form action={addToReadingListAction}>
                <input type="hidden" name="id" value={blog.id} />
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded text-sm cursor-pointer">
                  Add to Reading List
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
