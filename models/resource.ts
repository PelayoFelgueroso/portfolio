interface ACF {
  featured_video: number;
  featured_image: number;
  short_description: string;
  description: string;
  difficulty: string;
  github_link: string;
  techs: string[];
  index: string;
}

export interface FormattedDate {
  day: number;
  month: string;
  year: number;
}

export interface Resource {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: ACF;
  categories: number[];
  date: string;
  content: { protected: boolean; rendered: string };
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
  date: string;
  formatted_date: FormattedDate;
  content: { protected: boolean; rendered: string };
}

export interface NewResource {
  id: number;
  slug: string;
  title: string;
  categories: number[];
  short_description: string;
  description: string;
  difficulty: string;
  github_link: string;
  techs: string[];
  index: string;
  category_name: string[];
  date: string;
  formatted_date: FormattedDate;
  content: string;
}
