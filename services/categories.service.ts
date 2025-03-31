import {
  ArrowLeftRight,
  MarsStroke,
  Menu,
  Mouse,
  Rotate3D,
  SquareMousePointer,
} from "lucide-react";

export const categories = [
  {
    id: 1,
    icon: Mouse,
    name: "Scroll",
  },
  {
    id: 4,
    icon: SquareMousePointer,
    name: "Mouse",
  },
  {
    id: 5,
    icon: MarsStroke,
    name: "Mask",
  },
  {
    id: 6,
    icon: Rotate3D,
    name: "3D",
  },
  {
    id: 7,
    icon: Menu,
    name: "Menu",
  },
  {
    id: 8,
    icon: ArrowLeftRight,
    name: "Transition",
  },
];

export interface Category {
  id: number;
  description: string;
  name: string;
  acf: { image: number; description: string };
}

export const fetchCategories = async (API_BASE_URL: string): Promise<Record<number, string>> => {
  const res = await fetch(`${API_BASE_URL}/categories`, {
    cache: "force-cache",
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    console.error("error obtaining categorires");
    return {};
  }

  const categories: Category[] = await res.json();

  return categories.reduce<Record<number, string>>((acc, category) => {
    acc[category.id] = category.name;
    return acc;
  }, {});
};
