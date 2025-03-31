import { fetchMediaUrls } from "./media.service";
import { FormattedProject, Project } from "@/models/project";

const API_BASE_URL = "https://cms.pelayofelgueroso.es/wp-json/wp/v2";

const fetchProjects = async (): Promise<Project[]> => {
  const res = await fetch(`${API_BASE_URL}/proyecto`, {
    cache: "force-cache",
    next: { revalidate: 3600 },
  });
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
    };
  });
}
