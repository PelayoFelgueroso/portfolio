import { fetchMediaUrls } from "./media.service";
import { FormattedTarea, Tarea } from "@/models/tareas-conquer";

export const fetchTareas = async (): Promise<Tarea[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}tarea-conquer`,
    {
      cache: "force-cache",
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) {
    console.error("Error obtaining tareas conquer");
    return [];
  }
  return res.json();
};

export async function getFormattedTareas(): Promise<FormattedTarea[]> {
  const tareas = await fetchTareas();

  const imageIds: number[] = [
    ...new Set(
        tareas
        .map((tarea: Tarea) => tarea.featured_media)
        .filter(Boolean)
    ),
  ];
  const imageUrls = await fetchMediaUrls(imageIds);

  return tareas.map((tarea: Tarea) => {
    return {
      ...tarea,
      featured_image: imageUrls[tarea.featured_media],
    };
  });
}
