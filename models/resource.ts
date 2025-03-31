interface ACF {
  featured_video: number;
  featured_image: number;
  short_description: string;
  description: string;
  difficulty: string;
  github_link: string;
  techs: string[];
}

export interface Resource {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: ACF;
  categories: number[];
}


export interface FormattedResource {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: ACF;
  categories: number[];
  featured_image: string;
  featured_video: string;
  category_name: string[];
}