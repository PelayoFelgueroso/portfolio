"use client";

import { useState, useEffect } from "react";
import type { Category } from "@/schemas/category.schema";
import {
  fetchCategories,
  createCategory,
  deleteCategory,
} from "@/services/category.service";

export function useCategories(postTypeSlug: string) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const loadCategories = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchCategories(postTypeSlug);
      setCategories(data);
    } catch (err) {
      setError("Failed to load categories. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, [postTypeSlug]);

  const addCategory = async (name: string): Promise<boolean> => {
    if (!name.trim()) return false; // Retorna false en lugar de undefined

    setIsSubmitting(true);
    setError(null);

    try {
      const newCategory = await createCategory(postTypeSlug, { name });
      setCategories([...categories, newCategory]);
      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to create category. Please try again.");
      console.error(err);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async (): Promise<void> => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      await deleteCategory(postTypeSlug, deleteId);
      setCategories(categories.filter((cat) => cat.id !== deleteId));
      setShowDeleteDialog(false);
      // No retornamos ningún valor aquí
    } catch (err) {
      setError("Failed to delete category. Please try again.");
      console.error(err);
      // No retornamos ningún valor aquí tampoco
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const closeDeleteDialog = () => {
    setDeleteId(null);
    setShowDeleteDialog(false);
  };

  return {
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
  };
}
