"use client";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCategories } from "@/hooks/use-categories";
import { AddCategoryForm } from "./components/AddCategoryForm";
import { CategoriesList } from "./components/CategoriesList";
import { DeleteDialog } from "@/components/Admin/common/DeleteDialog";

interface CategoriesTabProps {
  postTypeSlug: string;
}

export function CategoriesTab({ postTypeSlug }: CategoriesTabProps) {
  const {
    categories,
    isLoading,
    isSubmitting,
    isDeleting,
    error,
    showDeleteDialog,
    addCategory,
    handleDeleteClick,
    confirmDelete,
    closeDeleteDialog,
  } = useCategories(postTypeSlug);

  return (
    <div className="flex flex-col gap-6">
      {error && (
        <Alert
          variant="destructive"
          className="bg-red-50 text-red-800 border-red-200"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <AddCategoryForm
        onAddCategory={addCategory}
        isSubmitting={isSubmitting}
      />

      <Card className="bg-white border-[#e1e1e1]">
        <CardHeader>
          <CardTitle className="text300">Available Categories</CardTitle>
          <CardDescription className="text100 text-[#949596]">
            Manage categories for this post type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CategoriesList
            categories={categories}
            isLoading={isLoading}
            onDeleteClick={handleDeleteClick}
          />
        </CardContent>
      </Card>

      <DeleteDialog
        isOpen={showDeleteDialog}
        isDeleting={isDeleting}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        type="category"
        title="Delete Category"
      />
    </div>
  );
}
