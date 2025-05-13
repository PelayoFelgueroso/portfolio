import { z } from "zod";

export const PostContentSchema = z.object({
  content: z.string(),
});

export type PostContent = z.infer<typeof PostContentSchema>;

export const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  categoryId: z.string().optional(),
});

export type Post = z.infer<typeof PostSchema>;
