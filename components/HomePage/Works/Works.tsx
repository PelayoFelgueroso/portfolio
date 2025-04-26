"use client";

import { useEffect } from "react";
import { AnimatePresence, useInView } from "framer-motion";
import { useProjects } from "@/contexts/Projects.context";
import { WorksInteractive } from "./components/WorksInteractive";

interface Props {
  onInViewChange: (visible: boolean) => void;
  worksRef: React.RefObject<HTMLDivElement | null>;
}

export const Works = ({ onInViewChange, worksRef }: Props) => {
  const { loadingProjects } = useProjects();
  const inView = useInView(worksRef, { once: false });

  useEffect(() => {
    onInViewChange(inView);
  }, [inView, onInViewChange]);

  return (
    <section
      id="works"
      className="relative mt-[200px] pb-[200px] lg:h-screen px-4"
    >
      <div
        ref={worksRef}
        className="grid-18 _1row items-center max-w-[1600px] md:mx-auto p-3 bg-whiteCustom shadow-2xl rounded-xl flex-col gap-6"
      >
        <AnimatePresence mode="wait">
          {!loadingProjects && <WorksInteractive />}
        </AnimatePresence>
      </div>
    </section>
  );
};
