import type {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@/schemas/category-page.schema";
import type { Post } from "@/schemas/create-post.schema";
import type { PostType } from "@/schemas/post-type.schema";

export async function fetchPostType(slug: string): Promise<PostType> {
  const res = await fetch(`/api/admin/post-types?slug=${slug}`);

  if (!res.ok) {
    throw new Error("Failed to fetch post type");
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

export async function fetchPostsForCategory(
  postTypeSlug: string,
  categoryId: string
): Promise<Post[]> {
  const res = await fetch(
    `/api/admin/${postTypeSlug}/posts?categoryId=${categoryId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export async function createCategory(
  postTypeSlug: string,
  data: CreateCategoryInput
): Promise<Category> {
  const res = await fetch(`/api/admin/${postTypeSlug}/categories`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to create category");
  }

  return res.json();
}

export async function updateCategory(
  postTypeSlug: string,
  categoryId: string,
  data: UpdateCategoryInput
): Promise<Category> {
  const res = await fetch(
    `/api/admin/${postTypeSlug}/categories/${categoryId}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to update category");
  }

  return res.json();
}

export async function deleteCategory(
  postTypeSlug: string,
  categoryId: string
): Promise<void> {
  const res = await fetch(
    `/api/admin/${postTypeSlug}/categories?id=${categoryId}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete category");
  }
}
