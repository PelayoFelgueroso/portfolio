import { Category } from "@prisma/client";

export interface Resource {
  id: number;
  slug: string;
  title: string;
  content: string;
  categoryIds: string[];
  categories: Category[];
  data: {
    featured_image: string;
    featured_video: string;
    short_description: string;
    description: string;
    difficulty: string;
    github_link: string;
    live_demo: string;
    techs: string[];
    content: string;
    date: string;
  };
}
