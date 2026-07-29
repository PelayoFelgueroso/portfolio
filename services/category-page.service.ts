import type {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@/schemas/category-page.schema";
import type { Post } from "@/schemas/create-post.schema";
import type { PostType } from "@/schemas/post-type.schema";
import { apiClient, buildAdminUrl, buildQueryUrl } from "@/lib/api-client";

export async function fetchPostType(slug: string): Promise<PostType> {
  return apiClient.get<PostType>(buildQueryUrl("/api/admin/post-types", { slug }));
}

export async function fetchCategories(
  postTypeSlug: string
): Promise<Category[]> {
  return apiClient.get<Category[]>(buildAdminUrl(postTypeSlug, "categories"));
}

export async function fetchPostsForCategory(
  postTypeSlug: string,
  categoryId: string
): Promise<Post[]> {
  return apiClient.get<Post[]>(
    buildQueryUrl(buildAdminUrl(postTypeSlug, "posts"), { categoryId })
  );
}

export async function createCategory(
  postTypeSlug: string,
  data: CreateCategoryInput
): Promise<Category> {
  return apiClient.post<Category>(buildAdminUrl(postTypeSlug, "categories"), data);
}

export async function updateCategory(
  postTypeSlug: string,
  categoryId: string,
  data: UpdateCategoryInput
): Promise<Category> {
  return apiClient.put<Category>(
    buildAdminUrl(postTypeSlug, "categories", categoryId),
    data
  );
}

export async function deleteCategory(
  postTypeSlug: string,
  categoryId: string
): Promise<void> {
  return apiClient.delete(
    buildQueryUrl(buildAdminUrl(postTypeSlug, "categories"), { id: categoryId })
  );
}
