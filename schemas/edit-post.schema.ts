import { z } from "zod";

// Define a union type for meta field values
export type MetaFieldValue =
  | string
  | number
  | boolean
  | string[]
  | null
  | undefined;

export const PostEditSchema = z.object({
  title: z.string().min(1, "Post title is required"),
  categoryIds: z.array(z.string()).optional(),
  data: z
    .record(
      z.union([
        z.string(),
        z.number(),
        z.boolean(),
        z.array(z.string()),
        z.null(),
        z.undefined(),
      ])
    )
    .optional(),
});

export type PostEditInput = z.infer<typeof PostEditSchema>;

export interface Post {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  categoryIds: string[];
  data?: Record<string, MetaFieldValue>;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface MetaField {
  name: string;
  type:
    | "string"
    | "long-string"
    | "number"
    | "boolean"
    | "date"
    | "file"
    | "string[]"
    | "file[]"
    | "url";
  label: string;
}
