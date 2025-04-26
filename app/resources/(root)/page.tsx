"use client";

import { ResourcesGrid } from "@/components/HomePage/Resources/ResourcesGrid/ResourcesGrid";
import { filterSlideIn } from "@/components/ResourcesMenu/anim";
import { useResourcesMenu } from "@/contexts/ResourcesMenu.context";
import { AnimatePresence, motion } from "framer-motion";

export default function ResourcesPage() {
  const { isOpenMenu } = useResourcesMenu();

  return (
    <>
      <main className="relative min-h-screen pt-[100px] z-10 bg-whiteCustom text-foreground">
        <AnimatePresence mode="wait">
          {isOpenMenu && (
            <motion.div
              variants={filterSlideIn}
              initial="initial"
              animate="open"
              exit="close"
              className="fixed z-[100] w-full h-full inset-0 bg-black opacity-90"
            ></motion.div>
          )}
        </AnimatePresence>
        <ResourcesGrid />
      </main>
    </>
  );
}
