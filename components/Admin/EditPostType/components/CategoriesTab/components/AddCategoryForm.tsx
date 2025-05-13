"use client";

import type React from "react";

import { useState } from "react";
import { FolderPlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AddCategoryFormProps {
  onAddCategory: (name: string) => Promise<boolean>;
  isSubmitting: boolean;
}

export function AddCategoryForm({
  onAddCategory,
  isSubmitting,
}: AddCategoryFormProps) {
  const [newCategory, setNewCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    const success = await onAddCategory(newCategory);
    if (success) {
      setNewCategory("");
    }
  };

  return (
    <Card className="bg-white border-[#e1e1e1]">
      <CardHeader>
        <CardTitle className="text300">Add New Category</CardTitle>
        <CardDescription className="text100 text-[#949596]">
          Create a new category for this post type
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 sm:flex-row sm:items-end"
        >
          <div className="flex-1">
            <Label htmlFor="new-category" className="text100 mb-2 block">
              Category Name
            </Label>
            <Input
              id="new-category"
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="e.g. News, Featured, Products"
              className="border-[#e1e1e1] focus:border-[#1f77ff] focus:ring-[#1f77ff]"
              disabled={isSubmitting}
            />
          </div>
          <Button
            type="submit"
            className="bg-[#1f77ff] hover:bg-[#1f77ff]/90 text-white"
            disabled={isSubmitting || !newCategory.trim()}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <FolderPlus className="mr-2 h-4 w-4" />
                Add Category
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
