import { likeBlogAction } from "@/app/actions/blogs";
import { getBlogById } from "@/app/services/blogs";
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

  return (
    <div>
      <h3>{blog.title}</h3>
      <p>Author: {blog.author}</p>
      <p>
        URL:{" "}
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </p>
      <p>Likes: {blog.likes}</p>
      <form action={likeBlogAction}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">Like</button>
      </form>
    </div>
  );
}

export default BlogPage;
