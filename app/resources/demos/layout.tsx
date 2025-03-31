import { fetchResources } from "@/services/resources.service";
import { DemosHeader } from "@/components/DemosHeader/DemosHeader";
import { ResourcesProvider } from "@/contexts/Resources.context";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const resources = await fetchResources();

  return (
    <ResourcesProvider resources={resources}>
      <DemosHeader />
      <div className="relative bg-gray">{children}</div>
    </ResourcesProvider>
  );
}
