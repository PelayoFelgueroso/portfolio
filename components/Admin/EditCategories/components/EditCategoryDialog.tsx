"use client";

import { Loader2, Save } from "lucide-react";
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
import type { Category } from "@/schemas/category.schema";

interface Props {
  category: Category | null;
  categoryName: string;
  isEditing: boolean;
  onNameChange: (name: string) => void;
  onSave: () => void;
  onClose: () => void;
}

export const EditCategoryDialog = ({
  category,
  categoryName,
  isEditing,
  onNameChange,
  onSave,
  onClose,
}: Props) => {
  return (
    <Dialog open={!!category} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white border-0">
        <DialogHeader>
          <DialogTitle className="text300">Edit Category</DialogTitle>
          <DialogDescription className="text100 text-[#949596]">
            Update the name of this category
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="category-name" className="text100">
              Category Name
            </Label>
            <Input
              id="category-name"
              value={categoryName}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Enter category name"
              className="border-[#e1e1e1]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-[#e1e1e1]"
          >
            Cancel
          </Button>
          <Button
            onClick={onSave}
            disabled={isEditing || !categoryName.trim()}
            className="bg-[#1f77ff] hover:bg-[#1f77ff]/90 text-white"
          >
            {isEditing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
