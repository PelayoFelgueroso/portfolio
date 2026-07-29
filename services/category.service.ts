import type { Category, CreateCategoryInput } from "@/schemas/category.schema";
import { apiClient, buildAdminUrl, buildQueryUrl } from "@/lib/api-client";

export async function fetchCategories(
  postTypeSlug: string
): Promise<Category[]> {
  return apiClient.get<Category[]>(buildAdminUrl(postTypeSlug, "categories"));
}

export async function createCategory(
  postTypeSlug: string,
  data: CreateCategoryInput
): Promise<Category> {
  return apiClient.post<Category>(buildAdminUrl(postTypeSlug, "categories"), data);
}

export async function deleteCategory(
  postTypeSlug: string,
  categoryId: string
): Promise<void> {
  return apiClient.delete(
    buildQueryUrl(buildAdminUrl(postTypeSlug, "categories"), { id: categoryId })
  );
}
