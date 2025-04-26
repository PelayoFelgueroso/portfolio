import { Footer } from "@/common/Footer/Footer";
import { ResourcesMenu } from "@/components/ResourcesMenu/ResourcesMenu";
import { InViewContactProvider } from "@/contexts/inViewContact.context";
import { ResourcesProvider } from "@/contexts/Resources.context";
import { ResourcesMenuProvider } from "@/contexts/ResourcesMenu.context";

export default function ResourcesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ResourcesProvider>
      <InViewContactProvider>
        <ResourcesMenuProvider>
          <ResourcesMenu />
          {children}
        </ResourcesMenuProvider>
        <Footer />
      </InViewContactProvider>
    </ResourcesProvider>
  );
}
