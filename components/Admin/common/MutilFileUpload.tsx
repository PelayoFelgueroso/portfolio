"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { FileUp, X, FileText, AlertCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CloudinaryImage } from "@/models/work";

interface FileItem {
  url: string;
  size?: number;
  type?: string;
  status?: "uploading" | "success" | "error";
  public_id: string;
  progress?: number;
  error?: string;
}

interface MultiFileUploadProps {
  value: CloudinaryImage[];
  onChange?: (value: CloudinaryImage[]) => void; // Added onChange to update parent component
  onFileChange?: (files: FileList | null) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
  accept?: string;
  uploadUrl: string;
}

export function MultiFileUpload({
  value = [],
  onChange,
  onFileChange,
  maxFiles = 10,
  maxSize = 2, // 2MB default
  accept = "*/*",
  uploadUrl,
}: MultiFileUploadProps) {
  const [files, setFiles] = useState<FileItem[]>(value || []);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update parent component when files change
  useEffect(() => {
    // Only include successfully uploaded files
    const successFiles = files
      .filter((file) => file.status === "success" && file.url && file.public_id)
      .map((file) => {
        return {
          url: file.url,
          public_id: file.public_id,
        };
      });

    if (onChange && JSON.stringify(successFiles) !== JSON.stringify(value)) {
      onChange(successFiles);
    }
  }, [files, onChange]);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    // Call the optional onFileChange callback
    if (onFileChange) {
      onFileChange(selectedFiles);
    }

    // Check if adding these files would exceed the max files limit
    if (files.length + selectedFiles.length > maxFiles) {
      alert(`You can only upload a maximum of ${maxFiles} files.`);
      return;
    }

    // Process each file
    Array.from(selectedFiles).forEach((file) => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File ${file.name} exceeds the maximum size of ${maxSize}MB.`);
        return;
      }

      // Create a new file item
      const newFile: FileItem = {
        url: URL.createObjectURL(file),
        public_id: "Loading",
        size: file.size,
        type: file.type,
        status: "uploading",
        progress: 0,
      };

      setFiles((prevFiles) => [...prevFiles, newFile]);

      // Upload the file
      uploadFile(file, newFile.public_id);
    });
  };

  const uploadFile = async (file: File, fileId: string) => {
    // Create a FormData object to send the file - similar to single file upload
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Use fetch API instead of XMLHttpRequest for consistency with single file upload
      const uploadRes = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error(`Upload failed with status ${uploadRes.status}`);
      }

      const { url, public_id } = await uploadRes.json();

      // Update the file with the returned URL
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.public_id === fileId
            ? {
                ...f,
                status: "success",
                progress: 100,
                url: url, // Use the URL returned from the server
                public_id: public_id,
              }
            : f
        )
      );
    } catch (err) {
      console.error("Upload error:", err);
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.public_id === fileId
            ? {
                ...f,
                status: "error",
                progress: 100,
                error:
                  err instanceof Error ? err.message : "Failed to upload file",
              }
            : f
        )
      );
    }
  };

  const removeFile = async (public_id: string) => {
    try {
      const deleteRes = await fetch(uploadUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id }),
      });

      if (!deleteRes.ok) {
        throw new Error("Failed to delete file");
      }

      setFiles((prevFiles) =>
        prevFiles.filter((f) => f.public_id != public_id)
      );
    } catch (err) {
      console.error("Failed to delete file. Please try again.", err);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  // Format file size to human-readable format
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={accept}
        className="hidden"
        onChange={(e) => handleFileSelect(e.target.files)}
      />

      <div
        className={cn(
          "border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors",
          isDragging
            ? "border-[#1f77ff] bg-[#e6f0ff]"
            : "border-[#e1e1e1] bg-[#f8f8f8] hover:bg-[#f0f0f0]"
        )}
        onClick={triggerFileInput}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <FileUp className="h-10 w-10 mx-auto mb-2 text-[#1f77ff]" />
        <p className="text-sm font-medium mb-1">
          Drag files here or click to select
        </p>
        <p className="text-xs text-[#949596]">
          Max {maxFiles} file (máx. {maxSize}MB each)
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2 mt-4">
          <p className="text-sm font-medium">Files ({files.length})</p>
          <div className="border rounded-md divide-y divide-[#e1e1e1]">
            {files.map((file) => (
              <div key={file.public_id} className="p-3 flex items-center gap-3">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-[#1f77ff]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="truncate pr-2">
                      <p className="text-sm font-medium truncate">{file.url}</p>
                      {file.size && file.size > 0 && (
                        <p className="text-xs text-[#949596]">
                          {formatFileSize(file.size)}
                        </p>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(file.public_id);
                      }}
                      className="h-6 w-6 p-0 text-[#949596] hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove file</span>
                    </Button>
                  </div>
                  {file.status === "uploading" && (
                    <div className="mt-1">
                      <Progress value={file.progress} className="h-1" />
                    </div>
                  )}
                  {file.status === "error" && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                      <AlertCircle className="h-3 w-3" />
                      <span>{file.error || "Error al cargar el archivo"}</span>
                    </div>
                  )}
                  {file.status === "success" && (
                    <div className="flex items-center gap-1 mt-1 text-green-500 text-xs">
                      <Check className="h-3 w-3" />
                      <span>File uploaded successfully</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
