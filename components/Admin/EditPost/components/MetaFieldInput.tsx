"use client";

import { useRef } from "react";
import { FileUp, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MultiFileUpload } from "@/components/Admin/common/MutilFileUpload";
import type { MetaField } from "@/schemas/edit-post.schema";
import { useFileUpload } from "@/hooks/use-file-upload";
import { DeleteDialog } from "../../common/DeleteDialog";

interface MetaFieldInputProps {
  field: MetaField;
  value: string | number | boolean | string[] | null | undefined;
  onChange: (
    value: string | number | boolean | string[] | null | undefined
  ) => void;
  fileInputRef?: { current: HTMLInputElement | null } | undefined;
  metaValues: Record<
    string,
    string | number | boolean | string[] | null | undefined
  >;
  fileNames: Record<string, string>;
  setFileNames: (fileNames: Record<string, string>) => void;
}

export function MetaFieldInput({
  field,
  value,
  onChange,
  fileInputRef,
  metaValues,
  fileNames,
  setFileNames,
}: MetaFieldInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const actualRef = fileInputRef || inputRef;

  const {
    isDeleting,
    showDeleteDialog,
    fileToDelete,
    handleFileChange,
    triggerFileInput,
    handleDeleteClick,
    confirmDelete,
    closeDeleteDialog,
  } = useFileUpload({
    metaValues,
    fileNames,
    setFileNames,
    handleMetaChange: onChange,
  });

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
        <>
          <div className="space-y-2">
            <input
              type="file"
              id={`file-${field.name}`}
              ref={actualRef}
              className="hidden"
              onChange={(e) => handleFileChange(field.name, e.target.files)}
            />

            {value ? (
              <div className="flex items-center gap-2 p-2 border border-[#e1e1e1] rounded-md bg-[#f8f8f8]">
                <span className="text-sm truncate flex-1">{String(value)}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteClick(field.name, String(value))}
                  className="h-8 w-8 p-0 text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (actualRef && actualRef.current) {
                    triggerFileInput(field.name, actualRef.current);
                  }
                }}
                className="w-full border-dashed border-[#e1e1e1] bg-[#f8f8f8] hover:bg-[#f0f0f0]"
              >
                <FileUp className="mr-2 h-4 w-4" />
                Upload File
              </Button>
            )}
          </div>

          {/* Delete Confirmation Dialog */}
          {fileToDelete && fileToDelete.fieldName === field.name && (
            <DeleteDialog
              isOpen={showDeleteDialog}
              isDeleting={isDeleting}
              onClose={closeDeleteDialog}
              onConfirm={confirmDelete}
              type="file"
            />
          )}
        </>
      );
    case "file[]":
      return (
        <MultiFileUpload
          value={Array.isArray(value) ? value : []}
          onChange={(urls) => onChange(urls)}
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
          maxSize={1} // 1MB per file
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
