"use client";

import type { Category } from "@/schemas/category.schema";
import type { Post } from "@/schemas/create-post.schema";
import { CategoryItem } from "./components/CategoryItem";
import { EmptyCategories } from "./EmptyCategories";

interface Props {
  categories: Category[];
  expandedCategories: Record<string, boolean>;
  categoryPosts: Record<string, Post[]>;
  postsLoading: Record<string, boolean>;
  onToggleCategory: (categoryId: string) => void;
  onEditCategory: (category: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
  onAddCategory: () => void;
  formatDate: (dateString: string) => string;
  onEditPost: (postId: string) => void;
}

export function CategoriesPageList({
  categories,
  expandedCategories,
  categoryPosts,
  postsLoading,
  onToggleCategory,
  onEditCategory,
  onDeleteCategory,
  onAddCategory,
  formatDate,
  onEditPost,
}: Props) {
  if (categories.length === 0) {
    return <EmptyCategories onAddCategory={onAddCategory} />;
  }

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          isExpanded={expandedCategories[category.id]}
          posts={categoryPosts[category.id]}
          postsLoading={postsLoading[category.id]}
          onToggle={() => onToggleCategory(category.id)}
          onEdit={() => onEditCategory(category)}
          onDelete={() => onDeleteCategory(category.id)}
          formatDate={formatDate}
          onEditPost={onEditPost}
        />
      ))}
    </div>
  );
}
