import { z } from "zod";

export const PostSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  slug: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  categoryId: z.string().optional(),
});

export const CreatePostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  categoryIds: z.array(z.string()).optional(),
});

export type Post = z.infer<typeof PostSchema>;
export type CreatePostInput = z.infer<typeof CreatePostSchema>;
