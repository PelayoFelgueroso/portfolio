import { Footer } from "@/components/Footer/Footer";
import { CursorHoverProvider } from "@/contexts/CursorHovert.context";
import { ResourcesProvider } from "@/contexts/Resources.context";
import { ProjectsProvider } from "@/contexts/Projects.context";
import { CurvedMenu } from "@/components/CurvedMenu/CurvedMenu";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <CursorHoverProvider>
        <ResourcesProvider>
          <ProjectsProvider>
            <CurvedMenu />
            {children}
            <Footer />
          </ProjectsProvider>
        </ResourcesProvider>
      </CursorHoverProvider>
    </>
  );
}
