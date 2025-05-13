"use client";

import { createPostType } from "@/services/post-types.service";
import { useState, useEffect } from "react";

interface PostType {
  id: string;
  slug: string;
  name: string;
}

export function usePostTypes() {
  const [postTypes, setPostTypes] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const fetchPostTypes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/post-types");
      if (!res.ok) {
        throw new Error("Failed to fetch post types");
      }
      const data = await res.json();
      setPostTypes(data);
    } catch (err) {
      setError("Failed to load post types. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPostTypes();
  }, []);

  const addPostType = async (name: string) => {
    setError(null);

    try {
      const createdPostType = await createPostType(name);
      setPostTypes([...postTypes, createdPostType]);
      return createdPostType;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to create post type. Please try again.");
      console.error(err);
      throw err;
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/post-types?id=${deleteId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete post type");
      }

      setPostTypes(postTypes.filter((pt) => pt.id !== deleteId));
      setShowDeleteDialog(false);
    } catch (err) {
      setError("Failed to delete post type. Please try again.");
      console.error(err);
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
    setDeleteId(null);
  };

  return {
    postTypes,
    isLoading,
    error,
    deleteId,
    isDeleting,
    showDeleteDialog,
    addPostType,
    handleDeleteClick,
    handleDeleteConfirm,
    closeDeleteDialog,
  };
}
