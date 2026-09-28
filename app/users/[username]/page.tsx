import { getUserAndBlogsByUsername } from "@/app/services/users";
import Link from "next/link";
import { notFound } from "next/navigation";

interface UserPageProps {
  params: Promise<{ username: string }>;
}

async function UserPage({ params }: UserPageProps) {
  const { username } = await params;
  const data = await getUserAndBlogsByUsername(username);

  if (!data) {
    return notFound();
  }

  return (
    <div>
      <h2>{data.name}</h2>
      <p>Username: {username}</p>
      <h3>Blogs:</h3>
      <ul>
        {data.blogs.map(blog => (
          <li key={blog.id}>
            <Link href={blog.url}>
              {blog.title} by {blog.author}
            </Link>{" "}
            (Likes: {blog.likes})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserPage;
