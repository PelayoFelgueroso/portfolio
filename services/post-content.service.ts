import type { Post } from "@/schemas/post-content.schema";
import { apiClient, buildAdminUrl } from "@/lib/api-client";

export async function fetchPost(
  postTypeSlug: string,
  postId: string
): Promise<Post> {
  return apiClient.get<Post>(buildAdminUrl(postTypeSlug, "posts", postId));
}

export async function fetchPostContent(
  postTypeSlug: string,
  postId: string
): Promise<string> {
  try {
    const res = await fetch(`/api/admin/${postTypeSlug}/posts/${postId}/content`);

    if (res.status === 404) {
      return "";
    }

    if (!res.ok) {
      throw new Error("Failed to fetch content");
    }

    return res.text();
  } catch (err) {
    throw err;
  }
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
