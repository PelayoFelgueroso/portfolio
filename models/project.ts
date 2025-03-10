interface Meta {
  featured_video: string;
  featured_image: string;
  short_description: string;
  description: string;
  github_link?: string;
  live_demo: string;
  techs: string;
  niche: string;
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
  techs: string[];
  niche: string;
}

export interface FormattedProject {
  id: number;
  slug: string;
  title: { rendered: string };
  meta: FormattedMeta;
}
