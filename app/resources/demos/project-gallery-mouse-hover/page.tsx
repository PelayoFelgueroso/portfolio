import { fetchProjects } from "@/apis/projects.api";
import { Projects } from "@/components/UILibrary/Projects/Projects";
import { ProjectsProvider } from "@/contexts/Projects.context";

export default async function Home() {
  const projects = await fetchProjects();

  return (
    <ProjectsProvider projects={projects}>
      <main className="bg-gray min-h-screen">
        <Projects />
      </main>
    </ProjectsProvider>
  );
}
