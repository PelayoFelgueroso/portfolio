"use client";

import { useState } from "react";

/**
 * Hook genérico para manejar diálogos de eliminación
 * Elimina la duplicación de código en múltiples hooks
 */
export function useDeleteDialog<T = string>() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<T | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (id: T) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setDeleteId(null);
    setShowDeleteDialog(false);
  };

  const executeDelete = async (deleteFn: (id: T) => Promise<void>) => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      await deleteFn(deleteId);
      setShowDeleteDialog(false);
    } catch (error) {
      throw error;
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  return {
    showDeleteDialog,
    deleteId,
    isDeleting,
    handleDeleteClick,
    closeDeleteDialog,
    executeDelete,
  };
}
