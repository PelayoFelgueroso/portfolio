import { Category, Resource, UnformattedResource } from "@/models/Resource";

export async function fetchResources(): Promise<Resource[]> {
  const resResources = await fetch(
    "https://cms.pelayofelgueroso.es/wp-json/wp/v2/resource"
  );

  if (!resResources.ok) {
    throw new Error("Failed to fetch resources");
  }

  const resources = await resResources.json();

  const resCategories = await fetch(
    "https://cms.pelayofelgueroso.es/wp-json/wp/v2/categories"
  );

  if (!resCategories.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categoriesData = await resCategories.json();

  const categoriesMap: Record<number, { id: number; name: string }> =
    categoriesData.reduce(
      (
        acc: Record<number, { id: number; name: string }>,
        category: Category
      ) => {
        acc[category.id] = { id: category.id, name: category.name };
        return acc;
      },
      {}
    );

  const formattedResources = resources.map((resource: UnformattedResource) => ({
    ...resource,
    technologies: resource.meta.technologies
      ? resource.meta.technologies.split(",").map((tech: string) => tech.trim())
      : [],

    categories: resource.categories.map(
      (catId: number) =>
        categoriesMap[catId] || { id: catId, name: "Desconocido" }
    ),
  }));

  return formattedResources;
}
