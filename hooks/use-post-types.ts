"use client";

import { fetchPostTypes, createPostType, deletePostType } from "@/services/post-types.service";
import { useState, useEffect } from "react";
import { useDeleteDialog } from "./common/use-delete-dialog";
import { useAsyncState } from "./common/use-async-state";

interface PostType {
  id: string;
  slug: string;
  name: string;
}

export function usePostTypes() {
  const [postTypes, setPostTypes] = useState<PostType[]>([]);
  
  // Usa los hooks genéricos
  const deleteDialog = useDeleteDialog<string>();
  const asyncState = useAsyncState();

  // Carga inicial de post types
  const loadPostTypes = async () => {
    const data = await asyncState.executeAsync(
      () => fetchPostTypes(),
      { errorMessage: "Failed to load post types. Please try again." }
    );
    
    if (data) {
      setPostTypes(data);
    }
  };

  useEffect(() => {
    loadPostTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Agregar post type
  const addPostType = async (name: string) => {
    asyncState.resetAll();

    try {
      const createdPostType = await createPostType(name);
      setPostTypes([...postTypes, createdPostType]);
      return createdPostType;
    } catch (err: any) {
      asyncState.setError(err.message || "Failed to create post type. Please try again.");
      console.error(err);
      throw err;
    }
  };

  // Eliminar post type
  const handleDeleteConfirm = async () => {
    await deleteDialog.executeDelete(async (id) => {
      await deletePostType(id);
      setPostTypes(postTypes.filter((pt) => pt.id !== id));
    });
  };

  return {
    postTypes,
    isLoading: asyncState.isLoading,
    error: asyncState.error,
    deleteId: deleteDialog.deleteId,
    isDeleting: deleteDialog.isDeleting,
    showDeleteDialog: deleteDialog.showDeleteDialog,
    addPostType,
    handleDeleteClick: deleteDialog.handleDeleteClick,
    handleDeleteConfirm,
    closeDeleteDialog: deleteDialog.closeDeleteDialog,
  };
}
