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

export function useCreatePost(postTypeSlug: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para el diálogo de eliminación
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Estados para el diálogo de creación
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [postsData, categoriesData] = await Promise.all([
        fetchPosts(postTypeSlug),
        fetchCategories(postTypeSlug),
      ]);

      setPosts(postsData);
      setCategories(categoriesData);
    } catch (err) {
      setError("Failed to load data. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [postTypeSlug]);

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

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async (): Promise<void> => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      await deletePost(postTypeSlug, deleteId);
      setPosts(posts.filter((post) => post.id !== deleteId));
      setShowDeleteDialog(false);
    } catch (err) {
      setError("Failed to delete post. Please try again.");
      console.error(err);
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
    posts,
    categories,
    isLoading,
    error,
    showDeleteDialog,
    isDeleting,
    showNewPostDialog,
    newPostTitle,
    categoryId,
    isSubmitting,
    setShowNewPostDialog,
    setNewPostTitle,
    setCategoryId,
    handleCreatePost,
    handleDeleteClick,
    confirmDelete,
    closeDeleteDialog,
  };
}
