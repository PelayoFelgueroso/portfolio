import { Resource, FormattedResource } from "@/models/resource";
import { fetchMediaUrls } from "./media.service";
import { fetchCategories } from "./categories.service";

const API_BASE_URL = "https://cms.pelayofelgueroso.es/wp-json/wp/v2";

export const fetchResources = async (): Promise<Resource[]> => {
  const res = await fetch(`${API_BASE_URL}/recurso`, {
    cache: "force-cache",
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    console.error("Error obtaining resources");
    return [];
  }
  return res.json();
};

export async function getFormattedResources(): Promise<FormattedResource[]> {
  const resources = await fetchResources();
  const categoryMap = await fetchCategories(API_BASE_URL);

  const imageIds: number[] = [
    ...new Set(
      resources
        .map((resource: Resource) => resource.acf.featured_image)
        .filter(Boolean)
    ),
  ];
  const imageUrls = await fetchMediaUrls(imageIds);

  const videoIds: number[] = [
    ...new Set(
      resources
        .map((resource: Resource) => resource.acf.featured_video)
        .filter(Boolean)
    ),
  ];
  const videoUrls = await fetchMediaUrls(videoIds);

  return resources.map((resource: Resource) => {
    const categoryNames = Array.isArray(resource.categories)
      ? resource.categories.map(
          (categoryId) => categoryMap[categoryId] || "Uncategorized"
        )
      : ["Uncategorized"];

    return {
      ...resource,
      featured_image: imageUrls[resource.acf.featured_image],
      featured_video: videoUrls[resource.acf.featured_video],
      category_name: categoryNames,
    };
  });
}
