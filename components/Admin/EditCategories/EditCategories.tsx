"use client";

import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCategoriesPage } from "@/hooks/use-categories-page";
import { StatusAlert } from "../common/StatusAlert";
import { CategoriesNav } from "./components/CategoriesNav";
import { EditCategoryDialog } from "./components/EditCategoryDialog";
import { NewCategoryDialog } from "./components/NewCategoryDialog";
import { DeleteDialog } from "../common/DeleteDialog";
import { CategoriesPageList } from "./components/CategoriesPageList/CategoriesPageList";

interface Props {
  slug: string;
}

export const EditCategoriesPage = ({ slug }: Props) => {
  const {
    postTypeTitle,
    categories,
    expandedCategories,
    categoryPosts,
    postsLoading,
    isLoading,
    error,
    successMessage,
    editingCategory,
    newCategoryName,
    isEditing,
    showNewCategoryDialog,
    newCategory,
    isSubmitting,
    showDeleteDialog,
    isDeleting,
    setNewCategoryName,
    setNewCategory,
    setShowNewCategoryDialog,
    toggleCategory,
    handleEditClick,
    handleEditSave,
    handleAddCategory,
    handleDeleteClick,
    handleDeleteConfirm,
    setShowDeleteDialog,
    formatDate,
    navigateToEditPost,
    handleBack,
  } = useCategoriesPage(slug);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-[#1f77ff]" />
      </div>
    );
  }

  return (
    <div className="pb300">
      <div className="flex flex-col gap-6">
        <CategoriesNav
          title={postTypeTitle}
          onBack={handleBack}
          onAddCategory={() => setShowNewCategoryDialog(true)}
        />

        <StatusAlert error={error} successMessage={successMessage} />

        <Card className="bg-white border-[#e1e1e1]">
          <CardHeader>
            <CardTitle className="text300">Categories</CardTitle>
            <CardDescription className="text100 text-[#949596]">
              View and manage categories for this post type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CategoriesPageList
              categories={categories}
              expandedCategories={expandedCategories}
              categoryPosts={categoryPosts}
              postsLoading={postsLoading}
              onToggleCategory={toggleCategory}
              onEditCategory={handleEditClick}
              onDeleteCategory={handleDeleteClick}
              onAddCategory={() => setShowNewCategoryDialog(true)}
              formatDate={formatDate}
              onEditPost={navigateToEditPost}
            />
          </CardContent>
        </Card>
      </div>

      {/* Edit Category Dialog */}
      <EditCategoryDialog
        category={editingCategory}
        categoryName={newCategoryName}
        isEditing={isEditing}
        onNameChange={setNewCategoryName}
        onSave={handleEditSave}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClose={() => handleEditClick(null as any)}
      />

      {/* New Category Dialog */}
      <NewCategoryDialog
        isOpen={showNewCategoryDialog}
        categoryName={newCategory}
        isSubmitting={isSubmitting}
        onNameChange={setNewCategory}
        onSubmit={handleAddCategory}
        onClose={() => setShowNewCategoryDialog(false)}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        isOpen={showDeleteDialog}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onClose={() => setShowDeleteDialog(false)}
        type="category"
      />
    </div>
  );
};
