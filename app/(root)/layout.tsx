import { CursorHoverProvider } from "@/contexts/CursorHovert.context";
import { ResourcesProvider } from "@/contexts/Resources.context";
import { ProjectsProvider } from "@/contexts/Projects.context";
import { CurvedMenu } from "@/common/CurvedMenu/CurvedMenu";
import { Footer } from "@/common/Footer/Footer";
import { InViewBioProvider } from "@/contexts/inViewBio.context";
import { InViewContactProvider } from "@/contexts/inViewContact.context";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <CursorHoverProvider>
        <ResourcesProvider>
          <ProjectsProvider>
            <InViewBioProvider>
              <InViewContactProvider>
                <CurvedMenu />
                {children}
                <Footer />
              </InViewContactProvider>
            </InViewBioProvider>
          </ProjectsProvider>
        </ResourcesProvider>
      </CursorHoverProvider>
    </>
  );
}
