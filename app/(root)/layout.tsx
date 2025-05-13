import { CursorHoverProvider } from "@/contexts/CursorHover.context";
import { CurvedMenu } from "@/common/CurvedMenu/CurvedMenu";
import { Footer } from "@/common/Footer/Footer";
import { InViewBioProvider } from "@/contexts/inViewBio.context";
import { InViewContactProvider } from "@/contexts/inViewContact.context";
import DotCursor from "@/common/DotCursor/DotCursor";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <CursorHoverProvider>
          <InViewBioProvider>
            <InViewContactProvider>
              <DotCursor />
              <CurvedMenu />
              {children}
              <Footer />
            </InViewContactProvider>
          </InViewBioProvider>
      </CursorHoverProvider>
    </>
  );
}
