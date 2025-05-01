import { Footer } from "@/common/Footer/Footer";
import { ResourcesMenu } from "@/components/ResourcesMenu/ResourcesMenu";
import { InViewContactProvider } from "@/contexts/inViewContact.context";
import { ResourcesMenuProvider } from "@/contexts/ResourcesMenu.context";
import { TareasProvider } from "@/contexts/TareasConquer.context";

export default function LayoutTareasConquer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <InViewContactProvider>
      <ResourcesMenuProvider>
        <ResourcesMenu />
        <TareasProvider>{children}</TareasProvider>
      </ResourcesMenuProvider>
      <Footer />
    </InViewContactProvider>
  );
}
