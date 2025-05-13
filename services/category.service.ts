import type { Category, CreateCategoryInput } from "@/schemas/category.schema";

export async function fetchCategories(
  postTypeSlug: string
): Promise<Category[]> {
  const res = await fetch(`/api/admin/${postTypeSlug}/categories`);

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
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
