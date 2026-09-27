import { createBlog } from "@/app/actions/blogs";

function NewBlog() {
  return (
    <div>
      <h2>Create a New Blog</h2>
      <form action={createBlog}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input type="text" id="author" name="author" />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input type="text" id="url" name="url" />
        </div>
        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
}

export default NewBlog;
