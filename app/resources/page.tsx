import { fetchResources } from "@/apis/resources.api";
import { CurvedMenu } from "@/components/CurvedMenu/CurvedMenu";
import { Footer } from "@/components/Footer/Footer";
import { ResourcesGrid } from "@/components/Resources/ResourcesGrid";
import { ResourcesProvider } from "@/contexts/Resources.context";

export default async function Home() {
  const resources = await fetchResources();

  return (
    <ResourcesProvider resources={resources}>
      <CurvedMenu />
      <main className="relative min-h-screen pt-[100px] z-10 bg-background text-foreground">
        <div className="">
          <ResourcesGrid />
        </div>
      </main>
      <Footer />
    </ResourcesProvider>
  );
}
