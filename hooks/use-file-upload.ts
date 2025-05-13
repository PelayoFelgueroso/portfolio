"use client";

import { useState } from "react";
import { uploadFile } from "@/services/edit-post.service";

interface UseFileUploadProps {
  metaValues: Record<
    string,
    string | number | boolean | string[] | null | undefined
  >;
  fileNames: Record<string, string>;
  setFileNames: (fileNames: Record<string, string>) => void;
  handleMetaChange: (
    fieldName: string,
    value: string | number | boolean | string[] | null | undefined
  ) => void;
}

interface UseFileUploadReturn {
  uploadError: string | null;
  isDeleting: boolean;
  showDeleteDialog: boolean;
  fileToDelete: { fieldName: string; fileName: string } | null;
  handleFileChange: (
    fieldName: string,
    files: FileList | null
  ) => Promise<void>;
  triggerFileInput: (
    fieldName: string,
    inputRef: HTMLInputElement | null
  ) => void;
  handleDeleteClick: (fieldName: string, fileName: string) => void;
  confirmDelete: () => Promise<void>;
  closeDeleteDialog: () => void;
}

export function useFileUpload({
  fileNames,
  setFileNames,
  handleMetaChange,
}: UseFileUploadProps): UseFileUploadReturn {
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<{
    fieldName: string;
    fileName: string;
  } | null>(null);

  // Handle file upload
  const handleFileChange = async (
    fieldName: string,
    files: FileList | null
  ): Promise<void> => {
    if (!files || files.length === 0) return;

    const file = files[0];
    setFileNames({
      ...fileNames,
      [fieldName]: file.name,
    });

    try {
      setUploadError(null);
      const { url } = await uploadFile(file);

      // Update the meta value with the file URL
      handleMetaChange(fieldName, url);
    } catch (err) {
      setUploadError("Failed to upload file. Please try again.");
      console.error(err);
    }
  };

  // Trigger file input click
  const triggerFileInput = (
    fieldName: string,
    inputRef: HTMLInputElement | null
  ): void => {
    if (inputRef) {
      inputRef.click();
    }
  };

  // Handle delete click
  const handleDeleteClick = (fieldName: string, fileName: string): void => {
    setFileToDelete({ fieldName, fileName });
    setShowDeleteDialog(true);
  };

  // Confirm delete
  const confirmDelete = async (): Promise<void> => {
    if (!fileToDelete) return;

    setIsDeleting(true);
    try {
      // Remove the file
      setFileNames({
        ...fileNames,
        [fileToDelete.fieldName]: "",
      });
      handleMetaChange(fileToDelete.fieldName, "");
      setShowDeleteDialog(false);
    } catch (err) {
      setUploadError("Failed to delete file. Please try again.");
      console.error(err);
    } finally {
      setIsDeleting(false);
      setFileToDelete(null);
    }
  };

  // Close delete dialog
  const closeDeleteDialog = (): void => {
    setFileToDelete(null);
    setShowDeleteDialog(false);
  };

  return {
    uploadError,
    isDeleting,
    showDeleteDialog,
    fileToDelete,
    handleFileChange,
    triggerFileInput,
    handleDeleteClick,
    confirmDelete,
    closeDeleteDialog,
  };
}
