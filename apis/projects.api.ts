import { FormattedProject, Project } from "@/models/project";

export async function fetchProjects(): Promise<FormattedProject[]> {
  const res = await fetch(
    "https://cms.pelayofelgueroso.es/wp-json/wp/v2/project"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  const projects = await res.json();

  const formattedProjects = projects.map((project: Project) => ({
    ...project,
    technologies: project.meta.technologies
      ? project.meta.technologies.split(",").map((tech: string) => tech.trim())
      : [],
  }));

  return formattedProjects;
}
