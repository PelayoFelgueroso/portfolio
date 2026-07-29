"use client";

import React, { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type {
  MetaField,
  PostEditInput,
  MetaFieldValue,
} from "@/schemas/edit-post.schema";
import { MetaFieldInput } from "./MetaFieldInput";

interface MetaFieldsCardProps {
  metaFields: MetaField[];
  fileNames: Record<string, string>;
  setFileNames: (fileNames: Record<string, string>) => void;
  handleMetaChange: (fieldName: string, value: MetaFieldValue) => void;
}

// Componente individual para cada campo
const MetaFieldRow = React.memo<{
  field: MetaField;
  value: MetaFieldValue;
  fileNames: Record<string, string>;
  setFileNames: (fileNames: Record<string, string>) => void;
  onMetaChange: (fieldName: string, value: MetaFieldValue) => void;
}>(({ field, value, fileNames, setFileNames, onMetaChange }) => {
  const handleChange = useCallback((newValue: MetaFieldValue) => {
    onMetaChange(field.name, newValue);
  }, [field.name, onMetaChange]);

  return (
    <div className="grid gap-2">
      <Label htmlFor={`meta-${field.name}`} className="text100">
        {field.label}
      </Label>
      <MetaFieldInput
        field={field}
        value={value}
        onChange={handleChange}
        fileNames={fileNames}
        setFileNames={setFileNames}
      />
    </div>
  );
});
MetaFieldRow.displayName = "MetaFieldRow";

export const MetaFieldsCard = React.memo<MetaFieldsCardProps>(({
  metaFields,
  fileNames,
  setFileNames,
  handleMetaChange,
}: MetaFieldsCardProps) => {
  const { watch } = useFormContext<PostEditInput>();
  const data = watch("data") || {};

  if (metaFields.length === 0) {
    return null;
  }

  return (
    <Card className="bg-white border-[#e1e1e1]">
      <CardHeader>
        <CardTitle className="text300">Meta Fields</CardTitle>
        <CardDescription className="text100 text-[#949596]">
          Additional information for this post
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {metaFields.map((field) => (
            <MetaFieldRow
              key={field.name}
              field={field}
              value={data[field.name]}
              fileNames={fileNames}
              setFileNames={setFileNames}
              onMetaChange={handleMetaChange}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}));

MetaFieldsCard.displayName = "MetaFieldsCard";
