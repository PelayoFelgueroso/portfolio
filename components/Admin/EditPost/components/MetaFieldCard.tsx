"use client";

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

export function MetaFieldsCard({
  metaFields,
  fileNames,
  setFileNames,
  handleMetaChange,
}: MetaFieldsCardProps) {
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
            <div key={field.name} className="grid gap-2">
              <Label htmlFor={`meta-${field.name}`} className="text100">
                {field.label}
              </Label>
              <MetaFieldInput
                field={field}
                value={data[field.name]}
                onChange={(value) => handleMetaChange(field.name, value)}
                fileNames={fileNames}
                setFileNames={setFileNames}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
