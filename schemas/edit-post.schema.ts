import { z } from "zod";

// Define the CloudinaryImage type
export const CloudinaryImageSchema = z.object({
  url: z.string().url("Invalid image URL"),
  public_id: z.string().min(1, "Public ID is required"),
});

export type CloudinaryImage = z.infer<typeof CloudinaryImageSchema>;

// Define meta field value types
export const MetaFieldValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.array(z.string()),
  CloudinaryImageSchema,
  z.array(CloudinaryImageSchema),
  z.null(),
]);

export type MetaFieldValue = z.infer<typeof MetaFieldValueSchema>;

// Define the post edit form schema
export const PostEditSchema = z.object({
  title: z.string().min(1, "Post title is required"),
  categoryIds: z.array(z.string()).optional().default([]),
  data: z.record(MetaFieldValueSchema).optional(),
});

export type PostEditInput = z.infer<typeof PostEditSchema>;

// Define the meta field type
export const metaFieldTypes = [
  "string",
  "long-string",
  "number",
  "boolean",
  "date",
  "file",
  "string[]",
  "file[]",
  "url",
] as const;

export const MetaFieldSchema = z.object({
  name: z.string().min(1),
  type: z.enum(metaFieldTypes),
  label: z.string().min(1),
});

export type MetaField = z.infer<typeof MetaFieldSchema>;

// Define the post type
export const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  categoryIds: z.array(z.string()).optional().default([]),
  data: z.record(MetaFieldValueSchema).optional(),
});

export type Post = z.infer<typeof PostSchema>;

// Define the category type
export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;
