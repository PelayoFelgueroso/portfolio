import { CursorHoverProvider } from "@/contexts/CursorHovert.context";
import { ResourcesProvider } from "@/contexts/Resources.context";
import { ProjectsProvider } from "@/contexts/Projects.context";
import { CurvedMenu } from "@/components/CurvedMenu/CurvedMenu";
import { FooterNew } from "@/components/FooterNew/FooterNew";
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
                <FooterNew />
              </InViewContactProvider>
            </InViewBioProvider>
          </ProjectsProvider>
        </ResourcesProvider>
      </CursorHoverProvider>
    </>
  );
}
