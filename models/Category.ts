import { Category } from "@prisma/client";

export interface FormattedCategory extends Category {
  posts: [];
}
