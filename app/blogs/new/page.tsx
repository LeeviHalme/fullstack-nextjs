"use client";

import { BlogFormState, createBlog } from "@/app/actions/blogs";
import { useNotification } from "@/app/components/NotificationContext";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

const initialState: BlogFormState = {
  errors: {},
  values: {},
  success: false,
};

function NewBlog() {
  const [state, formAction] = useActionState(createBlog, initialState);
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("blog created");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create a New Blog</h2>
      <form action={formAction} className="space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={state.values?.title}
            className="border rounded p-2 flex-1"
          />
        </div>
        {state.errors && state.errors?.title && (
          <p style={{ color: "red" }}>{state.errors.title}</p>
        )}
        <div className="flex flex-col gap-2">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            defaultValue={state.values?.author}
            className="border rounded p-2 flex-1"
          />
        </div>
        {state.errors && state.errors?.author && (
          <p style={{ color: "red" }}>{state.errors.author}</p>
        )}
        <div className="flex flex-col gap-2">
          <label htmlFor="url">URL</label>
          <input
            type="text"
            id="url"
            name="url"
            defaultValue={state.values?.url}
            className="border rounded p-2 flex-1"
          />
        </div>
        {state.errors && state.errors?.url && <p style={{ color: "red" }}>{state.errors.url}</p>}
        <button
          data-testid="create-blog-button"
          type="submit"
          className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm cursor-pointer">
          Create
        </button>
      </form>
    </div>
  );
}

export default NewBlog;
