import { Resource, FormattedResource, FormattedDate } from "@/models/resource";
import { fetchMediaUrls } from "./media.service";
import { getCategories } from "./categories.service";

const formatDate = (wpDate: string): FormattedDate => {
  const date = new Date(wpDate);
  return {
    day: date.getUTCDate(),
    month: date.toLocaleString("en-US", { month: "long" }),
    year: date.getUTCFullYear(),
  };
};

export const fetchResources = async (): Promise<Resource[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}recurso`,
    {
      cache: "force-cache",
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) {
    console.error("Error obtaining resources");
    return [];
  }
  return res.json();
};

export async function getFormattedResources(): Promise<FormattedResource[]> {
  const resources = await fetchResources();
  const categoryMap = await getCategories();

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
    const categoryLookup = Object.fromEntries(
      Object.values(categoryMap).map((category) => [category.id, category])
    );

    const categoryNames = Array.isArray(resource.categories)
      ? resource.categories.map(
          (categoryId) => categoryLookup[categoryId]?.name || "Uncategorized"
        )
      : ["Uncategorized"];

    return {
      ...resource,
      featured_image: imageUrls[resource.acf.featured_image],
      featured_video: videoUrls[resource.acf.featured_video],
      category_name: categoryNames,
      formatted_date: formatDate(resource.date),
    };
  });
}
