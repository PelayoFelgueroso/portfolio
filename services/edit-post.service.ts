import type { Post, Category, MetaField, PostEditInput, CloudinaryImage } from "@/schemas/edit-post.schema"

export async function fetchPost(postTypeSlug: string, postId: string): Promise<Post> {
  const res = await fetch(`/api/admin/${postTypeSlug}/posts/${postId}`)

  if (!res.ok) {
    throw new Error("Failed to fetch post")
  }

  return res.json()
}

export async function fetchCategories(postTypeSlug: string): Promise<Category[]> {
  const res = await fetch(`/api/admin/${postTypeSlug}/categories`)

  if (!res.ok) {
    throw new Error("Failed to fetch categories")
  }

  return res.json()
}

export async function fetchMetaFields(postTypeSlug: string): Promise<MetaField[]> {
  const res = await fetch(`/api/admin/${postTypeSlug}/meta`)

  if (!res.ok) {
    throw new Error("Failed to fetch meta fields")
  }

  return res.json()
}

export async function updatePost(postTypeSlug: string, postId: string, data: PostEditInput): Promise<Post> {
  const res = await fetch(`/api/admin/${postTypeSlug}/posts/${postId}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.error || "Failed to update post")
  }

  return res.json()
}

export async function uploadFile(file: File): Promise<CloudinaryImage> {
  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch(`/api/upload`, {
    method: "POST",
    body: formData,
  })

  if (!res.ok) {
    throw new Error("Failed to upload file")
  }

  return res.json()
}

export async function deleteFile(publicId: string): Promise<void> {
  const res = await fetch(`/api/upload`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ public_id: publicId }),
  })

  if (!res.ok) {
    throw new Error("Failed to delete file")
  }
}
