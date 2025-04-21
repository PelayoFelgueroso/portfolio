export interface Category {
  id: number;
  description: string;
  name: string;
  acf: { icon: { value: string } };
}

export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}categories`,
    {
      cache: "force-cache",
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    console.error("error obtaining categorires");
  }

  const categories: Category[] = await res.json();

  return categories;
};
