"use client";

import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  onBack: () => void;
  onAddCategory: () => void;
}

export const CategoriesNav = ({ title, onBack, onAddCategory }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <h1 className="text400 text-[#191a1b]">Categories for {title}</h1>
        <p className="text100 text-[#393939]">
          Manage categories and view posts within each category
        </p>
      </div>
      <div className="flex gap-2">
        <Button onClick={onBack} variant="outline" className="border-[#e1e1e1]">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {title}
        </Button>
        <Button
          onClick={onAddCategory}
          className="bg-[#1f77ff] hover:bg-[#1f77ff]/90 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>
    </div>
  );
};
