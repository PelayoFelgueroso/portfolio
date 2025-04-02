export interface Category {
  id: number;
  description: string;
  name: string;
  acf: { icon: { value: string } };
}

const API_BASE_URL = "https://cms.pelayofelgueroso.es/wp-json/wp/v2";

export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${API_BASE_URL}/categories`, {
    cache: "force-cache",
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    console.error("error obtaining categorires");
  }

  const categories: Category[] = await res.json();

  return categories;
};
