interface Blog {
  id: number;
  title: string;
  author: string;
  url: string;
  likes: number;
}

const blogs: Blog[] = [
  {
    id: 1,
    title: "My First Blog",
    author: "John Doe",
    url: "https://example.com/my-first-blog",
    likes: 10,
  },
  {
    id: 2,
    title: "My Second Blog",
    author: "Jane Smith",
    url: "https://example.com/my-second-blog",
    likes: 5,
  },
];

let nextId = 3;

export const getBlogs = () => {
  return blogs;
};

export const getBlogById = (id: number) => {
  return blogs.find(blog => blog.id === id);
};

export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({ id: nextId++, title, author, url, likes: 0 });
};

export const likeBlog = (id: number) => {
  const blog = getBlogById(id);
  if (blog) {
    blog.likes += 1;
  }
};
