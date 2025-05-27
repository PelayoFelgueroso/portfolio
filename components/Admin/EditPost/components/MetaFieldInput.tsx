"use client";

import { useRef } from "react";
import { FileUp, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MultiFileUpload } from "@/components/Admin/common/MutilFileUpload";
import type {
  MetaField,
  MetaFieldValue,
  CloudinaryImage,
} from "@/schemas/edit-post.schema";
import { uploadFile, deleteFile } from "@/services/edit-post.service";

interface MetaFieldInputProps {
  field: MetaField;
  value: MetaFieldValue;
  onChange: (value: MetaFieldValue) => void;
  fileNames: Record<string, string>;
  setFileNames: (fileNames: Record<string, string>) => void;
}

export function MetaFieldInput({
  field,
  value,
  onChange,
  fileNames,
  setFileNames,
}: MetaFieldInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      const { url, public_id } = await uploadFile(file);
      onChange({ url, public_id });
    } catch (err) {
      console.error("Failed to upload file:", err);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Remove file
  const removeFile = async (fieldName: string, publicId: string) => {
    try {
      await deleteFile(publicId);
      setFileNames({
        ...fileNames,
        [fieldName]: "",
      });
      onChange(null);
    } catch (err) {
      console.error("Failed to delete file:", err);
    }
  };

  // Convert value to string for input elements that require string values
  const stringValue =
    value !== null && value !== undefined ? String(value) : "";

  switch (field.type) {
    case "string":
      return (
        <Input
          id={`meta-${field.name}`}
          value={typeof value === "string" ? value : stringValue}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${field.label.toLowerCase()}`}
          className="border-[#e1e1e1]"
        />
      );
    case "long-string":
      return (
        <Textarea
          id={`meta-${field.name}`}
          value={typeof value === "string" ? value : stringValue}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${field.label.toLowerCase()}`}
          className="border-[#e1e1e1]"
        />
      );
    case "number":
      return (
        <Input
          id={`meta-${field.name}`}
          type="number"
          value={typeof value === "number" ? value : 0}
          onChange={(e) => onChange(Number.parseFloat(e.target.value) || 0)}
          placeholder={`Enter ${field.label.toLowerCase()}`}
          className="border-[#e1e1e1]"
        />
      );
    case "boolean":
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`meta-${field.name}`}
            checked={Boolean(value)}
            onCheckedChange={(checked) => onChange(Boolean(checked))}
          />
          <label
            htmlFor={`meta-${field.name}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {field.label}
          </label>
        </div>
      );
    case "date":
      return (
        <Input
          id={`meta-${field.name}`}
          type="date"
          value={typeof value === "string" ? value : stringValue}
          onChange={(e) => onChange(e.target.value)}
          className="border-[#e1e1e1]"
        />
      );
    case "url":
      return (
        <Input
          id={`meta-${field.name}`}
          type="url"
          value={typeof value === "string" ? value : stringValue}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com"
          className="border-[#e1e1e1]"
        />
      );
    case "string[]":
      // Simple comma-separated input for string arrays
      return (
        <Textarea
          id={`meta-${field.name}`}
          value={Array.isArray(value) ? value.join(", ") : ""}
          onChange={(e) =>
            onChange(e.target.value.split(",").map((item) => item.trim()))
          }
          placeholder="Enter values separated by commas"
          className="border-[#e1e1e1]"
        />
      );
    case "file":
      return (
        <div className="space-y-2">
          <input
            type="file"
            id={`file-${field.name}`}
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => handleFileChange(field.name, e.target.files)}
          />

          {value && typeof value === "object" && "url" in value ? (
            <div className="flex items-center gap-2 p-2 border border-[#e1e1e1] rounded-md bg-[#f8f8f8]">
              <span className="text-sm truncate flex-1">{value.url}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(field.name, value.public_id)}
                className="h-8 w-8 p-0 text-red-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={triggerFileInput}
              className="w-full border-dashed border-[#e1e1e1] bg-[#f8f8f8] hover:bg-[#f0f0f0]"
            >
              <FileUp className="mr-2 h-4 w-4" />
              Upload File
            </Button>
          )}
        </div>
      );
    case "file[]":
      return (
        <MultiFileUpload
          value={
            Array.isArray(value) &&
            value.length > 0 &&
            typeof value[0] === "object" &&
            "url" in value[0]
              ? (value as CloudinaryImage[])
              : []
          }
          onChange={(files) => onChange(files)}
          onFileChange={(files) => {
            if (files && files.length > 0) {
              const newFileNames = { ...fileNames };
              newFileNames[field.name] = Array.from(files)
                .map((file) => file.name)
                .join(", ");
              setFileNames(newFileNames);
            }
          }}
          maxFiles={10}
          maxSize={50} // 1MB per file
          accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
          uploadUrl="/api/upload"
        />
      );
    default:
      return (
        <Input
          id={`meta-${field.name}`}
          value={typeof value === "string" ? value : stringValue}
          onChange={(e) => onChange(e.target.value)}
          className="border-[#e1e1e1]"
        />
      );
  }
}
