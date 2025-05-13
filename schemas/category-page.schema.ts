import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Category name is required"),
  postTypeId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const CreateCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

export const UpdateCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

export type Category = z.infer<typeof CategorySchema>;
export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>;
