import { z } from "zod";

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
  name: z.string().min(1, "Field name is required"),
  type: z.enum(metaFieldTypes, {
    errorMap: () => ({ message: "Please select a valid field type" }),
  }),
  label: z.string().min(1, "Display label is required"),
});

export const MetaFieldsSchema = z.array(MetaFieldSchema);

export type MetaField = z.infer<typeof MetaFieldSchema>;
export type MetaFieldType = MetaField["type"];
