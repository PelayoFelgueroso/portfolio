import type { MetaField } from "@/schemas/meta-field.schema";
import { apiClient, buildAdminUrl } from "@/lib/api-client";

export async function fetchMetaFields(
  postTypeSlug: string
): Promise<MetaField[]> {
  return apiClient.get<MetaField[]>(buildAdminUrl(postTypeSlug, "meta"));
}

export async function saveMetaFields(
  postTypeSlug: string,
  meta: MetaField[]
): Promise<void> {
  return apiClient.put<void>(buildAdminUrl(postTypeSlug, "meta"), { meta });
}
