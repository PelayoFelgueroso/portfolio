interface Meta {
  featured_video: string;
  featured_image: string;
  short_description: string;
  description: string;
  github_link?: string;
  live_demo: string;
  technologies: string;
}

export interface Project {
  id: number;
  slug: string;
  title: { rendered: string };
  meta: Meta;
}

interface FormattedMeta {
  featured_video: string;
  featured_image: string;
  short_description: string;
  description: string;
  github_link?: string;
  live_demo: string;
  technologies: string[];
}

export interface FormattedProject {
  id: number;
  slug: string;
  title: { rendered: string };
  meta: FormattedMeta;
}
