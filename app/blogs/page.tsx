import Link from "next/link";
import { getBlogs } from "../services/blogs";

interface BlogListProps {
  searchParams: Promise<{ q?: string }>;
}

async function BlogList({ searchParams }: BlogListProps) {
  const { q } = await searchParams;
  const blogs = await getBlogs(q);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Blog List</h2>
      <form className="mb-4 flex">
        <input
          type="text"
          name="q"
          data-testid="filter-input"
          placeholder="Search blogs..."
          className="border rounded p-2 mr-2 flex-1"
        />
        <button
          data-testid="search-button"
          type="submit"
          className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm cursor-pointer">
          Search
        </button>
      </form>
      {blogs.length === 0 && <p>No blogs found.</p>}
      <ul className="space-y-2" data-testid="blogs-list">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <li key={blog.id} className="border rounded p-3 hover:bg-gray-500">
              <Link href={`/blogs/${blog.id}`} className="text-blue-600 hover:underline">
                {blog.title} by {blog.author} - {blog.likes} likes
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default BlogList;
