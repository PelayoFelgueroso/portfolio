"use client";

import { EditCategoriesPage } from "@/components/Admin/EditCategories/EditCategories";
import { useParams } from "next/navigation";

export default function CategoriesPage() {
  const { slug } = useParams() as { slug: string };

  return <EditCategoriesPage slug={slug} />;
}
