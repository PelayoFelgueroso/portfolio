"use client";

import { Tag, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onAddCategory: () => void;
}

export const EmptyCategories = ({ onAddCategory }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="rounded-full bg-[#e1e1e1] p-3 mb-4">
        <Tag className="h-6 w-6 text-[#393939]" />
      </div>
      <h3 className="text200 mb-2">No Categories Found</h3>
      <p className="text100 text-[#949596] max-w-md">
        Create your first category to organize your content
      </p>
      <Button
        onClick={onAddCategory}
        className="mt-4 bg-[#1f77ff] hover:bg-[#1f77ff]/90 text-white"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Category
      </Button>
    </div>
  );
};
