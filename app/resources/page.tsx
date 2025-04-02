"use client";

import { CurvedMenu } from "@/components/CurvedMenu/CurvedMenu";
import { Footer } from "@/components/Footer/Footer";
import { ResourcesGrid } from "@/components/Resources/ResourcesGrid";
import { useResources } from "@/contexts/Resources.context";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const { resources, loadingResources, categories, loadingCategories } =
    useResources();

  return (
    <>
      <CurvedMenu />
      <main className="relative min-h-screen pt-[100px] z-10 bg-[#F4F4F4] text-foreground">
        <AnimatePresence mode="wait">
          {!loadingResources && !loadingCategories && (
            <ResourcesGrid categories={categories} resources={resources} />
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
