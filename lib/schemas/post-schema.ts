import { z } from "zod"

// Types
export interface Post {
  id: string
  title: string
  slug: string
  createdAt: string
  updatedAt: string
  categoryIds?: string[]
  data?: Record<string, unknown>
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface MetaField {
  name: string
  type: "string" | "long-string" | "number" | "boolean" | "date" | "file" | "string[]" | "file[]" | "url"
  label: string
}

// Create a dynamic Zod schema based on meta fields
export const createFormSchema = (metaFields: MetaField[]) => {
  // Create schema for meta fields
  const metaSchema: Record<string, z.ZodTypeAny> = {}

  metaFields.forEach((field) => {
    switch (field.type) {
      case "string":
      case "long-string":
      case "date":
      case "file":
        metaSchema[field.name] = z.string().optional()
        break
      case "number":
        metaSchema[field.name] = z.number().optional()
        break
      case "boolean":
        metaSchema[field.name] = z.boolean().optional()
        break
      case "url":
        metaSchema[field.name] = z.string().url("Please enter a valid URL").optional()
        break
      case "string[]":
      case "file[]":
        metaSchema[field.name] = z.array(z.string()).optional()
        break
      default:
        metaSchema[field.name] = z.string().optional()
    }
  })

  // Main form schema
  return z.object({
    title: z.string().min(1, "Title is required"),
    categoryIds: z
      .array(z.string())
      .min(1, "Please select a category")
      .refine((ids) => ids[0] !== "none", { message: "Please select a category" }),
    data: z
      .record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.array(z.string()), z.null()]))
      .optional()
      .default({}),
  })
}

// Type for the schema
export type FormSchema = ReturnType<typeof createFormSchema>
// Type for the form values based on the schema
export type FormSchemaType = z.infer<FormSchema>

export const createPostSchema = (metaFields: MetaField[]) => {
  const metaSchema: Record<string, z.ZodTypeAny> = {}

  metaFields.forEach((field) => {
    switch (field.type) {
      case "string":
      case "long-string":
      case "date":
      case "file":
      case "url":
        metaSchema[field.name] = z.string().optional()
        break
      case "number":
        metaSchema[field.name] = z.number().optional()
        break
      case "boolean":
        metaSchema[field.name] = z.boolean().optional()
        break
      case "string[]":
      case "file[]":
        metaSchema[field.name] = z.array(z.string()).optional()
        break
      default:
        metaSchema[field.name] = z.string().optional()
    }
  })

  return z.object({
    title: z.string().min(1, "Title is required"),
    categoryIds: z.array(z.string()).min(1, "Please select a category"),
    data: z.record(z.string(), z.any()).optional(),
  })
}
