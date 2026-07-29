import { PostType } from "@prisma/client";
import { apiClient, buildQueryUrl } from "@/lib/api-client";

export async function fetchPostTypes(): Promise<PostType[]> {
  return apiClient.get<PostType[]>("/api/admin/post-types");
}

export async function createPostType(name: string): Promise<PostType> {
  return apiClient.post<PostType>("/api/admin/post-types", { name });
}

export async function deletePostType(id: string): Promise<void> {
  return apiClient.delete(buildQueryUrl("/api/admin/post-types", { id }));
}
