"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  fetchPost,
  fetchPostContent,
  savePostContent,
} from "@/services/post-content.service";

export function usePostContent(postTypeSlug: string, postId: string) {
  const router = useRouter();

  const [postTitle, setPostTitle] = useState("");
  const [content, setContent] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Fetch post data and MDX content
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch post data to get the title
        const postData = await fetchPost(postTypeSlug, postId);
        setPostTitle(postData.title || "Untitled Post");

        // Fetch MDX content
        const contentData = await fetchPostContent(postTypeSlug, postId);

        if (!contentData) {
          // No content yet, start with a template
          const template = `---
title: ${postData.title || "Untitled Post"}
date: ${new Date().toISOString()}
---

# ${postData.title || "Untitled Post"}

Write your content here...
`;
          setContent(template);
          setOriginalContent(template);
        } else {
          setContent(contentData);
          setOriginalContent(contentData);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load post content. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [postTypeSlug, postId]);

  // Check for unsaved changes
  useEffect(() => {
    setHasChanges(content !== originalContent);
  }, [content, originalContent]);

  // Handle content change
  const handleContentChange = (value: string) => {
    setContent(value);
  };

  // Save content
  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await savePostContent(postTypeSlug, postId, content);

      setOriginalContent(content);
      setSuccessMessage("Content saved successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to save content. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Go back to post edit page
  const handleBack = () => {
    router.push(`/admin/${postTypeSlug}/${postId}`);
  };

  // Prompt before leaving if there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasChanges]);

  return {
    postTitle,
    content,
    activeTab,
    isLoading,
    isSaving,
    error,
    successMessage,
    hasChanges,
    setActiveTab,
    handleContentChange,
    handleSave,
    handleBack,
  };
}
