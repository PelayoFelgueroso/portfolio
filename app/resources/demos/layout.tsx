import { DemosHeader } from "@/common/DemosHeader/DemosHeader";
import { ResourcesProvider } from "@/contexts/Resources.context";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ResourcesProvider>
      <DemosHeader />
      <div className="relative bg-gray">{children}</div>
    </ResourcesProvider>
  );
}
