"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createFormSchema,
  type FormSchemaType,
  type Post,
  type Category,
  type MetaField,
} from "@/lib/schemas/post-schema";

interface UsePostFormProps {
  slug: string;
  id: string;
}

export function usePostForm({ slug, id }: UsePostFormProps) {
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

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

  // Initialize form with React Hook Form and Zod
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(createFormSchema(metaFields)),
    defaultValues: {
      title: "",
      categoryIds: [],
      data: {},
    },
  });

  const { watch, setValue, reset, handleSubmit } = form;

  // Watch categoryIds for changes
  const watchedCategoryIds = watch("categoryIds");

  // Fetch post data, categories, and meta fields
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch post data
        const postRes = await fetch(`/api/admin/${slug}/posts/${id}`);
        if (!postRes.ok) throw new Error("Failed to fetch post");
        const postData = await postRes.json();

        // Fetch categories
        const categoriesRes = await fetch(`/api/admin/${slug}/categories`);
        if (!categoriesRes.ok) throw new Error("Failed to fetch categories");
        const categoriesData = await categoriesRes.json();

        // Fetch meta fields
        const metaRes = await fetch(`/api/admin/${slug}/meta`);
        if (!metaRes.ok) throw new Error("Failed to fetch meta fields");
        const metaData = await metaRes.json();

        setPost(postData);
        setCategories(categoriesData);
        setMetaFields(metaData || []);

        // Find the selected category
        const category = categoriesData.find(
          (c: Category) => c.id === postData.categoryIds?.[0]
        );
        setSelectedCategory(category || null);

        // Initialize file names for display
        const initialFileNames: Record<string, string> = {};
        metaData.forEach((field: MetaField) => {
          if (
            (field.type === "file" || field.type === "file[]") &&
            postData.data &&
            postData.data[field.name]
          ) {
            if (field.type === "file") {
              const fileName =
                typeof postData.data[field.name] === "string"
                  ? postData.data[field.name].split("/").pop()
                  : "";
              initialFileNames[field.name] = fileName || "";
            }
          }
        });
        setFileNames(initialFileNames);

        // Reset form with fetched data
        reset({
          title: postData.title,
          categoryIds: postData.categoryIds || [],
          data: postData.data || {},
        });
      } catch (err) {
        setError("Failed to load post data. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug, id, reset]);

  // Update selected category when categoryIds change
  useEffect(() => {
    if (watchedCategoryIds && watchedCategoryIds.length > 0) {
      const category = categories.find((c) => c.id === watchedCategoryIds[0]);
      setSelectedCategory(category || null);
    } else {
      setSelectedCategory(null);
    }
  }, [watchedCategoryIds, categories]);

  // Handle file upload
  const handleFileChange = async (
    fieldName: string,
    files: FileList | null
  ) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    setFileNames({
      ...fileNames,
      [fieldName]: file.name,
    });

    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append("file", file);

      // Upload the file to your server
      const uploadRes = await fetch(`/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload file");
      }

      const { url } = await uploadRes.json();

      // Update the form data with the file URL
      const currentData = watch("data") || {};
      setValue("data", {
        ...currentData,
        [fieldName]: url,
      });
    } catch (err) {
      setError("Failed to upload file. Please try again.");
      console.error(err);
    }
  };

  // Remove file
  const removeFile = (fieldName: string) => {
    setFileNames({
      ...fileNames,
      [fieldName]: "",
    });

    const currentData = watch("data") || {};
    setValue("data", {
      ...currentData,
      [fieldName]: "",
    });
  };

  // Save post changes
  const onSubmit = async (values: FormSchemaType) => {
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch(`/api/admin/${slug}/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update post");
      }

      setSuccessMessage("Post updated successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to update post. Please try again.";
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle form submission with validation
  const handleFormSubmit = () => {
    // Clear any existing errors
    setError(null);

    // Check if a category is selected
    const categoryIds = watch("categoryIds");
    if (!categoryIds || categoryIds.length === 0 || categoryIds[0] === "none") {
      setError("Please select a category");
      return;
    }

    // If validation passes, proceed with form submission
    handleSubmit(onSubmit)();
  };

  return {
    form,
    post,
    categories,
    metaFields,
    selectedCategory,
    fileNames,
    isLoading,
    isSaving,
    error,
    successMessage,
    fileInputRefs,
    handleFileChange,
    removeFile,
    onSubmit,
    handleFormSubmit,
    setError,
    setSuccessMessage,
  };
}
