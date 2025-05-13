export interface Work {
  id: string;
  slug: string;
  title: string;
  data: {
    featured_image: string;
    featured_image_mobile: string;
    featured_video: string;
    images_collection: string[];
    date: string;
    description: string;
    short_description: string;
    github_link: URL;
    live_demo: URL;
    techs: string[];
    niche: string;
    services: string[];
  };
}
