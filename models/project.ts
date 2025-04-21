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
  images_collection: {
    image_1: number;
    image_2: number;
    image_3: number;
    image_4: number;
    image_5: number;
  };
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
  images_collection: string[];
}
