import type { MetaField } from "@/schemas/meta-field.schema";

export async function fetchMetaFields(
  postTypeSlug: string
): Promise<MetaField[]> {
  const response = await fetch(`/api/admin/${postTypeSlug}/meta`);

  if (!response.ok) {
    throw new Error("Failed to fetch meta fields");
  }

  return response.json();
}

export async function saveMetaFields(
  postTypeSlug: string,
  meta: MetaField[]
): Promise<void> {
  const response = await fetch(`/api/admin/${postTypeSlug}/meta`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ meta }),
  });

  if (!response.ok) {
    throw new Error("Failed to save meta fields");
  }
}
