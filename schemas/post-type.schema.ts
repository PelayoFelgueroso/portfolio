import { z } from "zod";

export const PostTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

export type PostType = z.infer<typeof PostTypeSchema>;
