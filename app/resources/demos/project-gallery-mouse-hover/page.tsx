import { Projects } from "@/components/UILibrary/Projects/Projects";
import { ProjectsProvider } from "@/contexts/Projects.context";

export default async function Home() {
  return (
    <ProjectsProvider>
      <main className="bg-gray min-h-screen">
        <Projects />
      </main>
    </ProjectsProvider>
  );
}
