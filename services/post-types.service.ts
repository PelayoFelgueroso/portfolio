import { PostType } from "@prisma/client";

export async function fetchPostTypes(): Promise<PostType[]> {
  const res = await fetch(`/api/admin/post-types`);

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export async function createPostType(name: string): Promise<PostType> {
  const res = await fetch("/api/admin/post-types", {
    method: "POST",
    body: JSON.stringify({ name }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to create post type");
  }

  return res.json();
}
