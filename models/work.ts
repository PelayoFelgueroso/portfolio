export interface Work {
  id: string;
  slug: string;
  title: string;
  data: {
    featured_image: CloudinaryImage;
    featured_image_mobile: CloudinaryImage;
    featured_video: CloudinaryImage;
    images_collection: CloudinaryImage[];
    videos_collection: CloudinaryImage[];
    date: string;
    description: string;
    short_description: string;
    github_link: URL;
    live_demo: URL;
    techs: string[];
    niche: string;
    services: string;
    location: string;
  };
}

export interface CloudinaryImage {
  url: string;
  public_id: string;
}
