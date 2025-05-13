"use client";

import type React from "react";

import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  isOpen: boolean;
  categoryName: string;
  isSubmitting: boolean;
  onNameChange: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export const NewCategoryDialog = ({
  isOpen,
  categoryName,
  isSubmitting,
  onNameChange,
  onSubmit,
  onClose,
}: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white border-0">
        <DialogHeader>
          <DialogTitle className="text300">Add New Category</DialogTitle>
          <DialogDescription className="text100 text-[#949596]">
            Create a new category for this post type
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="new-category" className="text100">
                Category Name
              </Label>
              <Input
                id="new-category"
                value={categoryName}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="Enter category name"
                className="border-[#e1e1e1]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-[#e1e1e1]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !categoryName.trim()}
              className="bg-[#1f77ff] hover:bg-[#1f77ff]/90 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Category
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
