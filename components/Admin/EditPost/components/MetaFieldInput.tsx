"use client";

import React, { useRef, useCallback, useMemo } from "react";
import { FileUp, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MultiFileUpload } from "@/components/Admin/common/MutilFileUpload";
import type {
  MetaField,
  MetaFieldValue,
} from "@/schemas/edit-post.schema";
import { CloudinaryImage } from "@/schemas/edit-post.schema";
import { uploadToCloudinary, deleteFile } from "@/services/edit-post.service";

interface MetaFieldInputProps {
  field: MetaField;
  value: MetaFieldValue;
  onChange: (value: MetaFieldValue) => void;
  fileNames: Record<string, string>;
  setFileNames: (fileNames: Record<string, string>) => void;
}

// Componente para input de texto simple
const StringInput = React.memo<{
  fieldName: string;
  value: MetaFieldValue;
  onChange: (value: string) => void;
  placeholder: string;
}>(({ fieldName, value, onChange, placeholder }) => {
  const stringValue = value !== null && value !== undefined ? String(value) : "";
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <Input
      id={`meta-${fieldName}`}
      value={typeof value === "string" ? value : stringValue}
      onChange={handleChange}
      placeholder={placeholder}
      className="border-[#e1e1e1]"
    />
  );
});
StringInput.displayName = "StringInput";

// Componente para textarea
const LongStringInput = React.memo<{
  fieldName: string;
  value: MetaFieldValue;
  onChange: (value: string) => void;
  placeholder: string;
}>(({ fieldName, value, onChange, placeholder }) => {
  const stringValue = value !== null && value !== undefined ? String(value) : "";
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <Textarea
      id={`meta-${fieldName}`}
      value={typeof value === "string" ? value : stringValue}
      onChange={handleChange}
      placeholder={placeholder}
      className="border-[#e1e1e1]"
    />
  );
});
LongStringInput.displayName = "LongStringInput";

// Componente para input numérico
const NumberInput = React.memo<{
  fieldName: string;
  value: MetaFieldValue;
  onChange: (value: number) => void;
  placeholder: string;
}>(({ fieldName, value, onChange, placeholder }) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number.parseFloat(e.target.value) || 0);
  }, [onChange]);

  return (
    <Input
      id={`meta-${fieldName}`}
      type="number"
      value={typeof value === "number" ? value : 0}
      onChange={handleChange}
      placeholder={placeholder}
      className="border-[#e1e1e1]"
    />
  );
});
NumberInput.displayName = "NumberInput";

// Componente para checkbox
const BooleanInput = React.memo<{
  fieldName: string;
  label: string;
  value: MetaFieldValue;
  onChange: (value: boolean) => void;
}>(({ fieldName, label, value, onChange }) => {
  const handleChange = useCallback((checked: boolean) => {
    onChange(Boolean(checked));
  }, [onChange]);

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`meta-${fieldName}`}
        checked={Boolean(value)}
        onCheckedChange={handleChange}
      />
      <label
        htmlFor={`meta-${fieldName}`}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
});
BooleanInput.displayName = "BooleanInput";

// Componente para array de strings
const StringArrayInput = React.memo<{
  fieldName: string;
  value: MetaFieldValue;
  onChange: (value: string[]) => void;
}>(({ fieldName, value, onChange }) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value.split(",").map((item) => item.trim()));
  }, [onChange]);

  return (
    <Textarea
      id={`meta-${fieldName}`}
      value={Array.isArray(value) ? value.join(", ") : ""}
      onChange={handleChange}
      placeholder="Enter values separated by commas"
      className="border-[#e1e1e1]"
    />
  );
});
StringArrayInput.displayName = "StringArrayInput";

// Componente para upload de archivo único
const FileInput = React.memo<{
  fieldName: string;
  value: MetaFieldValue;
  onChange: (value: MetaFieldValue) => void;
  fileNames: Record<string, string>;
  setFileNames: (fileNames: Record<string, string>) => void;
}>(({ fieldName, value, onChange, fileNames, setFileNames }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    setFileNames({
      ...fileNames,
      [fieldName]: file.name,
    });

    try {
      const { secure_url, public_id } = await uploadToCloudinary(file, {
        folder: "uploads",
        resourceType: "auto",
      });
      onChange({ url: secure_url, public_id });
    } catch (err) {
      console.error("Failed to upload file:", err);
    }
  }, [fieldName, onChange, fileNames, setFileNames]);

  const triggerFileInput = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const removeFile = useCallback(async (publicId: string) => {
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
  }, [fieldName, onChange, fileNames, setFileNames]);

  const hasFile = value && typeof value === "object" && "url" in value;

  return (
    <div className="space-y-2">
      <input
        type="file"
        id={`file-${fieldName}`}
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => handleFileChange(e.target.files)}
      />

      {hasFile ? (
        <div className="flex items-center gap-2 p-2 border border-[#e1e1e1] rounded-md bg-[#f8f8f8]">
          <span className="text-sm truncate flex-1">{value.url}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => removeFile(value.public_id)}
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
});
FileInput.displayName = "FileInput";

// Componente para múltiples archivos
const MultiFileInput = React.memo<{
  fieldName: string;
  value: MetaFieldValue;
  onChange: (value: CloudinaryImage[]) => void;
  fileNames: Record<string, string>;
  setFileNames: (fileNames: Record<string, string>) => void;
}>(({ fieldName, value, onChange, fileNames, setFileNames }) => {
  const fileValue = useMemo(() => {
    return Array.isArray(value) &&
      value.length > 0 &&
      typeof value[0] === "object" &&
      "url" in value[0]
      ? (value as CloudinaryImage[])
      : [];
  }, [value]);

  const handleFileChange = useCallback((files: FileList | null) => {
    if (files && files.length > 0) {
      const newFileNames = { ...fileNames };
      newFileNames[fieldName] = Array.from(files)
        .map((file) => file.name)
        .join(", ");
      setFileNames(newFileNames);
    }
  }, [fieldName, fileNames, setFileNames]);

  return (
    <MultiFileUpload
      value={fileValue}
      onChange={onChange}
      onFileChange={handleFileChange}
      maxFiles={10}
      maxSize={50}
      accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
    />
  );
});
MultiFileInput.displayName = "MultiFileInput";

export const MetaFieldInput = React.memo<MetaFieldInputProps>(({
  field,
  value,
  onChange,
  fileNames,
  setFileNames,
}: MetaFieldInputProps) => {
  const placeholder = useMemo(
    () => `Enter ${field.label.toLowerCase()}`,
    [field.label]
  );

  const stringValue = useMemo(
    () => (value !== null && value !== undefined ? String(value) : ""),
    [value]
  );

  switch (field.type) {
    case "string":
      return (
        <StringInput
          fieldName={field.name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      );
    case "long-string":
      return (
        <LongStringInput
          fieldName={field.name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      );
    case "number":
      return (
        <NumberInput
          fieldName={field.name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      );
    case "boolean":
      return (
        <BooleanInput
          fieldName={field.name}
          label={field.label}
          value={value}
          onChange={onChange}
        />
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
      return (
        <StringArrayInput
          fieldName={field.name}
          value={value}
          onChange={onChange}
        />
      );
    case "file":
      return (
        <FileInput
          fieldName={field.name}
          value={value}
          onChange={onChange}
          fileNames={fileNames}
          setFileNames={setFileNames}
        />
      );
    case "file[]":
      return (
        <MultiFileInput
          fieldName={field.name}
          value={value}
          onChange={onChange}
          fileNames={fileNames}
          setFileNames={setFileNames}
        />
      );
    default:
      return (
        <StringInput
          fieldName={field.name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      );
  }
}));

MetaFieldInput.displayName = "MetaFieldInput";
