"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import type {
  Post,
  Category,
  MetaField,
  PostEditInput,
  MetaFieldValue,
} from "@/schemas/edit-post.schema";
import { PostEditSchema } from "@/schemas/edit-post.schema";
import {
  fetchPost,
  fetchCategories,
  fetchMetaFields,
  updatePost,
} from "@/services/edit-post.service";

export function usePostEdit(postTypeSlug: string, postId: string) {
  const router = useRouter();

  const [post, setPost] = useState<Post | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [metaFields, setMetaFields] = useState<MetaField[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [fileNames, setFileNames] = useState<Record<string, string>>({});

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Initialize react-hook-form
  const form = useForm<PostEditInput>({
    resolver: zodResolver(PostEditSchema),
    defaultValues: {
      title: "",
      categoryIds: [],
      data: {},
    },
    mode: "onChange",
  });

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
        setCategories(categoriesData);
        setMetaFields(metaData || []);

        // Find the selected category
        const category = categoriesData.find(
          (c: Category) => c.id === postData.categoryIds?.[0]
        );
        setSelectedCategory(category || null);

        // Initialize form values
        form.reset({
          title: postData.title,
          categoryIds: postData.categoryIds || [],
          data: postData.data || {},
        });

        // Initialize file names for display
        const initialFileNames: Record<string, string> = {};
        const metaFieldsData = metaData || [];

        metaFieldsData.forEach((field: MetaField) => {
          if (
            field.type === "file" &&
            postData.data &&
            postData.data[field.name]
          ) {
            const fileData = postData.data[field.name];
            if (
              typeof fileData === "object" &&
              fileData !== null &&
              "url" in fileData
            ) {
              const fileName = fileData.url.split("/").pop() || "";
              initialFileNames[field.name] = fileName;
            }
          } else if (
            field.type === "file[]" &&
            postData.data &&
            Array.isArray(postData.data[field.name])
          ) {
            const fileArray = postData.data[field.name];
            if (Array.isArray(fileArray) && fileArray.length > 0) {
              const fileNames = fileArray
                .map((file) => {
                  if (
                    typeof file === "object" &&
                    file !== null &&
                    "url" in file
                  ) {
                    return file.url.split("/").pop() || "";
                  }
                  return "";
                })
                .filter(Boolean)
                .join(", ");
              initialFileNames[field.name] = fileNames;
            }
          }
        });

        setFileNames(initialFileNames);
      } catch (err) {
        setError("Failed to load post data. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [postTypeSlug, postId, form]);

  // Update selected category when categoryId changes
  useEffect(() => {
    const categoryId = form.watch("categoryIds")?.[0] || "";
    const category = categories.find((c: Category) => c.id === categoryId);
    setSelectedCategory(category || null);
  }, [form.watch("categoryIds"), categories]);

  // Handle meta field changes
  const handleMetaChange = (fieldName: string, value: MetaFieldValue) => {
    const currentData = form.getValues("data") || {};
    form.setValue(
      "data",
      { ...currentData, [fieldName]: value },
      { shouldValidate: true }
    );
  };

  // Save post changes
  const onSubmit = async (data: PostEditInput) => {
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await updatePost(postTypeSlug, postId, data);
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
    fileNames,
    setFileNames,
    isLoading,
    isSaving,
    error,
    successMessage,
    form,
    handleMetaChange,
    onSubmit,
    handleBack,
    navigateToContentEditor,
    formatDate,
  };
}
