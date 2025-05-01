export interface Tarea {
  id: number;
  slug: string;
  title: { rendered: string };
  featured_media: number;
}

export interface FormattedTarea {
  id: number;
  slug: string;
  title: { rendered: string };
  featured_image: string;
}
