"use client";

import { useState, useEffect } from "react";
import type { Category } from "@/schemas/category.schema";
import {
  fetchCategories,
  createCategory,
  deleteCategory,
} from "@/services/category.service";
import { useDeleteDialog } from "./common/use-delete-dialog";
import { useAsyncState } from "./common/use-async-state";

export function useCategories(postTypeSlug: string) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Usa los hooks genéricos en lugar de duplicar la lógica
  const deleteDialog = useDeleteDialog<string>();
  const asyncState = useAsyncState();

  // Carga inicial de categorías
  const loadCategories = async () => {
    const data = await asyncState.executeAsync(
      () => fetchCategories(postTypeSlug),
      { errorMessage: "Failed to load categories. Please try again." }
    );
    
    if (data) {
      setCategories(data);
    }
  };

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postTypeSlug]);

  // Agregar categoría
  const addCategory = async (name: string): Promise<boolean> => {
    if (!name.trim()) return false;

    setIsSubmitting(true);
    asyncState.resetAll();

    try {
      const newCategory = await createCategory(postTypeSlug, { name });
      setCategories([...categories, newCategory]);
      return true;
    } catch (err: any) {
      asyncState.setError(err.message || "Failed to create category. Please try again.");
      console.error(err);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Eliminar categoría
  const confirmDelete = async (): Promise<void> => {
    await deleteDialog.executeDelete(async (id) => {
      await deleteCategory(postTypeSlug, id);
      setCategories(categories.filter((cat) => cat.id !== id));
    });
  };

  return {
    categories,
    isLoading: asyncState.isLoading,
    isSubmitting,
    isDeleting: deleteDialog.isDeleting,
    error: asyncState.error,
    showDeleteDialog: deleteDialog.showDeleteDialog,
    addCategory,
    handleDeleteClick: deleteDialog.handleDeleteClick,
    confirmDelete,
    closeDeleteDialog: deleteDialog.closeDeleteDialog,
  };
}
