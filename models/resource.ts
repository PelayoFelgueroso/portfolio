interface Meta {
  featured_video: string;
  featured_image: string;
  short_description: string;
  description: string;
  difficulty: string;
  github_link: string;
  technologies: string;
}

export interface Category {
  id: number;
  name: string;
}

interface FormattedMeta {
  featured_video: string;
  featured_image: string;
  short_description: string;
  description: string;
  github_link?: string;
  technologies: string[];
}

export interface Resource {
  id: number;
  slug: string;
  title: { rendered: string };
  meta: FormattedMeta;
  categories: Category[];
}

export interface UnformattedResource {
  id: number;
  slug: string;
  title: { rendered: string };
  meta: Meta;
  categories: number[];
}
