"use client";

import { CurvedMenu } from "@/components/CurvedMenu/CurvedMenu";
import { Footer } from "@/components/Footer/Footer";
import { ResourcesGrid } from "@/components/Resources/ResourcesGrid";
import { ResourcesProvider, useResources } from "@/contexts/Resources.context";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const { resources, loadingResources } = useResources();

  return (
    <ResourcesProvider>
      <CurvedMenu />
      <main className="relative bg-[#F4F4F4] min-h-screen pt-[100px] z-10 bg-background text-foreground">
        <AnimatePresence mode="wait">
         {!loadingResources && <ResourcesGrid resources={resources} />}
        </AnimatePresence>
      </main>
      <Footer />
    </ResourcesProvider>
  );
}
