"use client";

import type React from "react";

import { useState, useEffect } from "react";
import type { Post } from "@/schemas/create-post.schema";
import type { Category } from "@/schemas/category.schema";
import {
  fetchPosts,
  fetchCategories,
  createPost,
  deletePost,
} from "@/services/post.services";
import { useDeleteDialog } from "./common/use-delete-dialog";
import { useFetchParallel } from "./common/use-fetch";

export function useCreatePost(postTypeSlug: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Estados para el diálogo de creación
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Usa los hooks genéricos
  const deleteDialog = useDeleteDialog<string>();

  // Carga paralela de posts y categorías
  const { data, isLoading } = useFetchParallel({
    posts: () => fetchPosts(postTypeSlug),
    categories: () => fetchCategories(postTypeSlug),
  });

  // Actualiza los estados cuando los datos se cargan
  useEffect(() => {
    if (data.posts) setPosts(data.posts);
    if (data.categories) setCategories(data.categories);
  }, [data]);

  const handleCreatePost = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!newPostTitle.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const createdPost = await createPost(postTypeSlug, {
        title: newPostTitle,
        categoryIds: categoryId ? [categoryId] : [],
      });

      setPosts([...posts, createdPost]);
      resetNewPostForm();
    } catch (err: any) {
      setError(err.message || "Failed to create post. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetNewPostForm = () => {
    setNewPostTitle("");
    setCategoryId("");
    setShowNewPostDialog(false);
  };

  // Eliminar post
  const confirmDelete = async (): Promise<void> => {
    await deleteDialog.executeDelete(async (id) => {
      await deletePost(postTypeSlug, id);
      setPosts(posts.filter((post) => post.id !== id));
    });
  };

  return {
    posts,
    categories,
    isLoading,
    error,
    showDeleteDialog: deleteDialog.showDeleteDialog,
    isDeleting: deleteDialog.isDeleting,
    showNewPostDialog,
    newPostTitle,
    categoryId,
    isSubmitting,
    setShowNewPostDialog,
    setNewPostTitle,
    setCategoryId,
    handleCreatePost,
    handleDeleteClick: deleteDialog.handleDeleteClick,
    confirmDelete,
    closeDeleteDialog: deleteDialog.closeDeleteDialog,
  };
}
