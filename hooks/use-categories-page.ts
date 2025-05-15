"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CreateCategorySchema,
  UpdateCategorySchema,
} from "@/schemas/category-page.schema";
import type { Category } from "@/schemas/category-page.schema";
import type { Post } from "@/schemas/create-post.schema";
import {
  fetchPostType,
  fetchCategories,
  fetchPostsForCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/services/category-page.service";

export function useCategoriesPage(postTypeSlug: string) {
  const router = useRouter();

  const [postTypeTitle, setPostTypeTitle] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});
  const [categoryPosts, setCategoryPosts] = useState<Record<string, Post[]>>(
    {}
  );
  const [postsLoading, setPostsLoading] = useState<Record<string, boolean>>({});

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Edit category state
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // New category state
  const [showNewCategoryDialog, setShowNewCategoryDialog] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete category state
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch post type name and categories
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch post type name and categories in parallel
        const [postTypeData, categoriesData] = await Promise.all([
          fetchPostType(postTypeSlug),
          fetchCategories(postTypeSlug),
        ]);

        setPostTypeTitle(postTypeData.name || postTypeSlug);
        setCategories(categoriesData);

        // Initialize expanded state for all categories
        const initialExpandedState: Record<string, boolean> = {};
        categoriesData.forEach((category: Category) => {
          initialExpandedState[category.id] = false;
        });
        setExpandedCategories(initialExpandedState);

        // Initialize loading state for posts
        const initialLoadingState: Record<string, boolean> = {};
        categoriesData.forEach((category: Category) => {
          initialLoadingState[category.id] = false;
        });
        setPostsLoading(initialLoadingState);
      } catch (err) {
        setError("Failed to load data. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [postTypeSlug]);

  // Fetch posts for a category when expanded
  const fetchPostsForCategoryId = async (categoryId: string) => {
    if (categoryPosts[categoryId]) return; // Already fetched

    setPostsLoading({ ...postsLoading, [categoryId]: true });

    try {
      const data = await fetchPostsForCategory(postTypeSlug, categoryId);

      setCategoryPosts({
        ...categoryPosts,
        [categoryId]: data,
      });
    } catch (err) {
      console.error("Failed to fetch posts for category:", err);
    } finally {
      setPostsLoading({ ...postsLoading, [categoryId]: false });
    }
  };

  // Toggle category expansion
  const toggleCategory = async (categoryId: string) => {
    const newExpandedState = {
      ...expandedCategories,
      [categoryId]: !expandedCategories[categoryId],
    };

    setExpandedCategories(newExpandedState);

    // Fetch posts if expanding and not already loaded
    if (newExpandedState[categoryId] && !categoryPosts[categoryId]) {
      await fetchPostsForCategoryId(categoryId);
    }
  };

  // Handle edit category
  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setIsEditing(false);
  };

  const handleEditSave = async () => {
    if (!editingCategory) return;

    // Validate with Zod
    const result = UpdateCategorySchema.safeParse({ name: newCategoryName });
    if (!result.success) {
      setError(result.error.errors[0]?.message || "Invalid category name");
      return;
    }

    setIsEditing(true);
    setError(null);

    try {
      await updateCategory(postTypeSlug, editingCategory.id, {
        name: newCategoryName,
      });

      // Update categories list
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id
            ? { ...cat, name: newCategoryName }
            : cat
        )
      );

      setSuccessMessage("Category updated successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);

      setIsEditing(false);
      setEditingCategory(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to update category. Please try again.");
      console.error(err);
    } finally {
      setIsEditing(false);
    }
  };

  // Handle add new category
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate with Zod
    const result = CreateCategorySchema.safeParse({ name: newCategory });
    if (!result.success) {
      setError(result.error.errors[0]?.message || "Invalid category name");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const createdCategory = await createCategory(postTypeSlug, {
        name: newCategory,
      });

      // Update categories list
      setCategories([...categories, createdCategory]);

      // Initialize expanded and loading state for the new category
      setExpandedCategories({
        ...expandedCategories,
        [createdCategory.id]: false,
      });

      setPostsLoading({
        ...postsLoading,
        [createdCategory.id]: false,
      });

      setNewCategory("");
      setShowNewCategoryDialog(false);

      setSuccessMessage("Category created successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to create category. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete category
  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      await deleteCategory(postTypeSlug, deleteId);

      // Update categories list
      setCategories(categories.filter((cat) => cat.id !== deleteId));

      // Remove from expanded and posts state
      const newExpandedState = { ...expandedCategories };
      delete newExpandedState[deleteId];
      setExpandedCategories(newExpandedState);

      const newCategoryPosts = { ...categoryPosts };
      delete newCategoryPosts[deleteId];
      setCategoryPosts(newCategoryPosts);

      setShowDeleteDialog(false);

      setSuccessMessage("Category deleted successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      setError("Failed to delete category. Please try again.");
      console.error(err);
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Navigate to edit post
  const navigateToEditPost = (postId: string) => {
    router.push(`/admin/${postTypeSlug}/${postId}`);
  };

  // Navigate back to post type page
  const handleBack = () => {
    router.push(`/admin/${postTypeSlug}`);
  };

  return {
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
  };
}
