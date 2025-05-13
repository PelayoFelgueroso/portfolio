export interface Tarea {
  id: number;
  slug: string;
  title: string;
  content: string;
  data: {
    featured_image: string;
  };
}
