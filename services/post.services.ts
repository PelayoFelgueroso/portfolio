import type { Post, CreatePostInput } from "@/schemas/create-post.schema";
import type { Category } from "@/schemas/category.schema";
import { apiClient, buildAdminUrl } from "@/lib/api-client";

export async function fetchPosts(postTypeSlug: string): Promise<Post[]> {
  return apiClient.get<Post[]>(buildAdminUrl(postTypeSlug, "posts"));
}

export async function fetchCategories(
  postTypeSlug: string
): Promise<Category[]> {
  return apiClient.get<Category[]>(buildAdminUrl(postTypeSlug, "categories"));
}

export async function createPost(
  postTypeSlug: string,
  data: CreatePostInput
): Promise<Post> {
  return apiClient.post<Post>(buildAdminUrl(postTypeSlug, "posts"), data);
}

export async function deletePost(
  postTypeSlug: string,
  postId: string
): Promise<void> {
  return apiClient.delete(buildAdminUrl(postTypeSlug, "posts", postId));
}
