import type { Post, CreatePostInput } from "@/schemas/create-post.schema";
import type { Category } from "@/schemas/category.schema";

export async function fetchPosts(postTypeSlug: string): Promise<Post[]> {
  const res = await fetch(`/api/admin/${postTypeSlug}/posts`);

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export async function fetchCategories(
  postTypeSlug: string
): Promise<Category[]> {
  const res = await fetch(`/api/admin/${postTypeSlug}/categories`);

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

export async function createPost(
  postTypeSlug: string,
  data: CreatePostInput
): Promise<Post> {
  const res = await fetch(`/api/admin/${postTypeSlug}/posts`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to create post");
  }

  return res.json();
}

export async function deletePost(
  postTypeSlug: string,
  postId: string
): Promise<void> {
  const res = await fetch(`/api/admin/${postTypeSlug}/posts/${postId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete post");
  }
}
