import Link from "next/link";
import { getBlogs } from "../services/blogs";

interface BlogListProps {
  searchParams: Promise<{ q?: string }>;
}

async function BlogList({ searchParams }: BlogListProps) {
  const { q } = await searchParams;
  const blogs = await getBlogs(q);

  return (
    <div>
      <h2>Blog List</h2>
      <form>
        <input type="text" name="q" placeholder="Search blogs..." />
        <button type="submit">Search</button>
      </form>
      {blogs.length === 0 && <p>No blogs found.</p>}
      <ul>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <li key={blog.id}>
              <Link href={`/blogs/${blog.id}`}>
                {blog.title} by {blog.author} - {blog.likes} likes
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default BlogList;
