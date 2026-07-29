/**
 * Servicios refactorizados usando el apiClient genérico
 * Reduce significativamente la duplicación de código
 */

import { apiClient, buildAdminUrl, buildQueryUrl } from "@/lib/api-client";
import type { Category, CreateCategoryInput } from "@/schemas/category.schema";
import type { Post, CreatePostInput } from "@/schemas/create-post.schema";
import type { MetaField } from "@/schemas/meta-field.schema";

// ============= CATEGORY SERVICES =============
export const categoryService = {
  fetchAll: (postTypeSlug: string) =>
    apiClient.get<Category[]>(buildAdminUrl(postTypeSlug, "categories")),

  create: (postTypeSlug: string, data: CreateCategoryInput) =>
    apiClient.post<Category>(buildAdminUrl(postTypeSlug, "categories"), data),

  update: (postTypeSlug: string, categoryId: string, data: Partial<Category>) =>
    apiClient.put<Category>(buildAdminUrl(postTypeSlug, "categories", categoryId), data),

  delete: (postTypeSlug: string, categoryId: string) =>
    apiClient.delete(buildQueryUrl(buildAdminUrl(postTypeSlug, "categories"), { id: categoryId })),
};

// ============= POST SERVICES =============
export const postService = {
  fetchAll: (postTypeSlug: string) =>
    apiClient.get<Post[]>(buildAdminUrl(postTypeSlug, "posts")),

  fetchOne: (postTypeSlug: string, postId: string) =>
    apiClient.get<Post>(buildAdminUrl(postTypeSlug, "posts", postId)),

  create: (postTypeSlug: string, data: CreatePostInput) =>
    apiClient.post<Post>(buildAdminUrl(postTypeSlug, "posts"), data),

  update: (postTypeSlug: string, postId: string, data: Partial<Post>) =>
    apiClient.put<Post>(buildAdminUrl(postTypeSlug, "posts", postId), data),

  delete: (postTypeSlug: string, postId: string) =>
    apiClient.delete(buildAdminUrl(postTypeSlug, "posts", postId)),
};

// ============= META FIELD SERVICES =============
export const metaFieldService = {
  fetchAll: (postTypeSlug: string) =>
    apiClient.get<MetaField[]>(buildAdminUrl(postTypeSlug, "meta")),

  save: (postTypeSlug: string, meta: MetaField[]) =>
    apiClient.put<void>(buildAdminUrl(postTypeSlug, "meta"), { meta }),
};

// ============= POST TYPE SERVICES =============
export const postTypeService = {
  fetchAll: () => apiClient.get("/api/admin/post-types"),

  create: (name: string) => apiClient.post("/api/admin/post-types", { name }),

  delete: (id: string) =>
    apiClient.delete(buildQueryUrl("/api/admin/post-types", { id })),
};

// ============= POST CONTENT SERVICES =============
export const postContentService = {
  fetchPost: (postTypeSlug: string, postId: string) =>
    apiClient.get<Post>(buildAdminUrl(postTypeSlug, "posts", postId)),

  fetchContent: (postTypeSlug: string, postId: string) =>
    apiClient.get<string>(buildAdminUrl(postTypeSlug, `posts/${postId}/content`, "")),

  saveContent: (postTypeSlug: string, postId: string, content: string) =>
    apiClient.put<void>(buildAdminUrl(postTypeSlug, `posts/${postId}/content`, ""), { content }),
};
