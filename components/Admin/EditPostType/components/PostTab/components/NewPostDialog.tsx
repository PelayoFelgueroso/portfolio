"use client";

import type React from "react";

import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Category } from "@/schemas/category.schema";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  title: string;
  onTitleChange: (value: string) => void;
  categoryId: string;
  onCategoryChange: (value: string) => void;
  categories: Category[];
  isSubmitting: boolean;
}

export const NewPostDialog = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  onTitleChange,
  categoryId,
  onCategoryChange,
  categories,
  isSubmitting,
}: Props) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && title.trim() && !isSubmitting) {
      e.preventDefault();
      onSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-0">
        <DialogHeader>
          <DialogTitle className="text300">Create New Post</DialogTitle>
          <DialogDescription className="text100 text-[#949596]">
            Add a new post to your content
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text100">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter post title"
                className="border-[#e1e1e1]"
                disabled={isSubmitting}
                autoFocus
              />
            </div>

            {categories.length > 0 && (
              <div className="grid gap-2">
                <Label htmlFor="category" className="text100">
                  Category (Optional)
                </Label>
                <Select value={categoryId} onValueChange={onCategoryChange}>
                  <SelectTrigger className="border-[#e1e1e1]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#e1e1e1]">
                    <SelectItem value="none">None</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-[#e1e1e1]"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#1f77ff] hover:bg-[#1f77ff]/90 text-white"
              disabled={isSubmitting || !title.trim()}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Post
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
