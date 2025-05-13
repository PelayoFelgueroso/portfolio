import type { Post } from "@/schemas/post-content.schema";

export async function fetchPost(
  postTypeSlug: string,
  postId: string
): Promise<Post> {
  const res = await fetch(`/api/admin/${postTypeSlug}/posts/${postId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  return res.json();
}

export async function fetchPostContent(
  postTypeSlug: string,
  postId: string
): Promise<string> {
  const res = await fetch(`/api/admin/${postTypeSlug}/posts/${postId}/content`);

  if (res.status === 404) {
    return "";
  }

  if (!res.ok) {
    throw new Error("Failed to fetch content");
  }

  return res.text();
}

export async function savePostContent(
  postTypeSlug: string,
  postId: string,
  content: string
): Promise<void> {
  const res = await fetch(
    `/api/admin/${postTypeSlug}/posts/${postId}/content`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "text/plain",
      },
      body: content,
    }
  );

  if (!res.ok) {
    throw new Error("Failed to save content");
  }
}
