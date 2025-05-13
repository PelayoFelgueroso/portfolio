"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type {
  Post,
  Category,
  MetaField,
  MetaFieldValue,
} from "@/schemas/edit-post.schema";
import {
  fetchPost,
  fetchCategories,
  fetchMetaFields,
  updatePost,
} from "@/services/edit-post.service";

export function usePostEdit(postTypeSlug: string, postId: string) {
  const router = useRouter();
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const [post, setPost] = useState<Post | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [metaFields, setMetaFields] = useState<MetaField[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [metaValues, setMetaValues] = useState<Record<string, MetaFieldValue>>(
    {}
  );
  const [fileNames, setFileNames] = useState<Record<string, string>>({});

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch post data, categories, and meta fields
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch all data in parallel
        const [postData, categoriesData, metaData] = await Promise.all([
          fetchPost(postTypeSlug, postId),
          fetchCategories(postTypeSlug),
          fetchMetaFields(postTypeSlug),
        ]);

        setPost(postData);
        setTitle(postData.title);
        setCategoryId(postData.categoryIds?.[0] || "");

        // Find the selected category
        const category = categoriesData.find(
          (c: Category) => c.id === postData.categoryIds?.[0]
        );
        setSelectedCategory(category || null);

        // Initialize meta values from post data or with defaults
        const initialMetaValues: Record<string, MetaFieldValue> = {};
        const initialFileNames: Record<string, string> = {};
        const metaFieldsData = metaData || [];

        metaFieldsData.forEach((field: MetaField) => {
          // Use existing meta value if available, otherwise set default value
          if (postData.data && postData.data[field.name] !== undefined) {
            initialMetaValues[field.name] = postData.data[field.name];

            // If it's a file field, store the filename for display
            if (field.type === "file" || field.type === "file[]") {
              const rawValue = postData.data?.[field.name];

              const fileName =
                typeof rawValue === "string" && rawValue
                  ? rawValue.split("/").pop() ?? ""
                  : "";
              initialFileNames[field.name] = fileName || "";
            }
          } else {
            // Set default values based on field type
            switch (field.type) {
              case "boolean":
                initialMetaValues[field.name] = false;
                break;
              case "number":
                initialMetaValues[field.name] = 0;
                break;
              case "string[]":
                initialMetaValues[field.name] = [];
                break;
              case "file[]":
                initialMetaValues[field.name] = [];
                break;
              default:
                initialMetaValues[field.name] = "";
            }
          }
        });

        setMetaValues(initialMetaValues);
        setFileNames(initialFileNames);
        setCategories(categoriesData);
        setMetaFields(metaFieldsData);
      } catch (err) {
        setError("Failed to load post data. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [postTypeSlug, postId]);

  useEffect(() => {
    const category = categories.find((c: Category) => c.id === categoryId);
    setSelectedCategory(category || null);
  }, [categoryId, categories]);

  // Handle meta field changes
  const handleMetaChange = (fieldName: string, value: MetaFieldValue) => {
    setMetaValues({
      ...metaValues,
      [fieldName]: value,
    });
  };

  // Save post changes
  const handleSave = async () => {
    if (!title.trim()) {
      setError("Post title is required");
      return;
    }

    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await updatePost(postTypeSlug, postId, {
        title,
        categoryIds: categoryId ? [categoryId] : [],
        data: metaValues,
      });

      setSuccessMessage("Post updated successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to update post. Please try again.");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  // Go back to posts list
  const handleBack = () => {
    router.push(`/admin/${postTypeSlug}`);
  };

  // Navigate to content editor
  const navigateToContentEditor = () => {
    router.push(`/admin/${postTypeSlug}/${postId}/content`);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return {
    post,
    categories,
    metaFields,
    selectedCategory,
    title,
    setTitle,
    categoryId,
    setCategoryId,
    metaValues,
    fileNames,
    setFileNames,
    isLoading,
    isSaving,
    error,
    successMessage,
    fileInputRefs,
    handleMetaChange,
    handleSave,
    handleBack,
    navigateToContentEditor,
    formatDate,
  };
}
