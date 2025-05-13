"use client";

import { Loader2, Tag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Category } from "@/schemas/category.schema";

interface Props {
  categories: Category[];
  isLoading: boolean;
  onDeleteClick: (id: string) => void;
}

export function CategoriesList({
  categories,
  isLoading,
  onDeleteClick,
}: Props) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-[#1f77ff]" />
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="rounded-full bg-[#e1e1e1] p-3 mb-4">
          <Tag className="h-6 w-6 text-[#393939]" />
        </div>
        <h3 className="text200 mb-2">No Categories Found</h3>
        <p className="text100 text-[#949596] max-w-md">
          Create your first category to organize your content
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-[#e1e1e1]">
      <table className="w-full text-left">
        <thead className="bg-[#f4f4f4] text100">
          <tr>
            <th className="px-4 py-3 font-medium text-[#393939]">Name</th>
            <th className="px-4 py-3 font-medium text-[#393939] text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#e1e1e1]">
          {categories.map((category) => (
            <tr key={category.id} className="bg-white hover:bg-[#f4f4f4]">
              <td className="px-4 py-3 text100 font-medium">{category.name}</td>
              <td className="px-4 py-3 text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteClick(category.id)}
                  className="text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete {category.name}</span>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
