import { fetchMediaUrls } from "./media.service";
import { FormattedProject, Project } from "@/models/project";

export const fetchProjects = async (): Promise<Project[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}proyecto`,
    {
      cache: "force-cache",
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) {
    console.error("Error obtaining projects");
    return [];
  }
  return res.json();
};

export async function getFormattedProjects(): Promise<FormattedProject[]> {
  const projects = await fetchProjects();

  const mediaIds: number[] = [
    ...new Set(
      projects
        .flatMap((project: Project) => [
          project.acf.featured_image,
          project.acf.featured_image_mobile,
          project.acf.featured_video,
          project.acf.images_collection.image_1,
          project.acf.images_collection.image_2,
          project.acf.images_collection.image_3,
          project.acf.images_collection.image_4,
          project.acf.images_collection.image_5,
        ])
        .filter(Boolean)
    ),
  ];
  const mediaUrls = await fetchMediaUrls(mediaIds);

  return projects.map((project: Project) => {
    return {
      ...project,
      featured_image: mediaUrls[project.acf.featured_image],
      featured_image_mobile: mediaUrls[project.acf.featured_image_mobile],
      featured_video: mediaUrls[project.acf.featured_video],
      images_collection: Object.values(project.acf.images_collection).map(
        (imageId) => mediaUrls[imageId]
      ),
    };
  });
}
