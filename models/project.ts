interface ACF {
  featured_video: number;
  featured_image: number;
  featured_image_mobile: number;
  short_description: string;
  description: string;
  github_link: string;
  live_demo: string;
  techs: string[];
  niche: string;
}

export interface Project {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: ACF;
}

export interface FormattedProject {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: ACF;
  featured_image: string;
  featured_image_mobile: string;
  featured_video: string;
}
