import { Footer } from "@/components/Footer/Footer";
import { CursorHoverProvider } from "@/contexts/CursorHovert.context";
import { ResourcesProvider } from "@/contexts/Resources.context";
import { fetchResources } from "@/apis/resources.api";
import { ProjectsProvider } from "@/contexts/Projects.context";
import { fetchProjects } from "@/apis/projects.api";
import { CurvedMenu } from "@/components/CurvedMenu/CurvedMenu";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const resources = await fetchResources();
  const projects = await fetchProjects();

  return (
    <>
      <CursorHoverProvider>
        <ResourcesProvider resources={resources}>
          <ProjectsProvider projects={projects}>
            <CurvedMenu />
            {children}
            <Footer />
          </ProjectsProvider>
        </ResourcesProvider>
      </CursorHoverProvider>
    </>
  );
}
