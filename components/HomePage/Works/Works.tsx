import { WorkCard } from "./components/WorkCard";
import { Work } from "@/models/work";
import useWorkStore, { UseWorkStoreType } from "@/store/useWorkStore";
import { AnimatePresence, useInView } from "framer-motion";
import { useEffect } from "react";

interface Props {
  onInViewChange: (visible: boolean) => void;
  worksRef: React.RefObject<HTMLDivElement | null>;
}

export const Works = ({ onInViewChange, worksRef }: Props) => {
  const inView = useInView(worksRef, { once: false });
  const { works, loading } = useWorkStore() as UseWorkStoreType;

  useEffect(() => {
    onInViewChange(inView);
  }, [inView, onInViewChange]);

  const groupedWorks = works.reduce<Work[][]>((acc, work, index) => {
    if (index % 2 === 0) acc.push([work]);
    else acc[acc.length - 1].push(work);
    return acc;
  }, []);

  return (
    <section
      id="works"
      ref={worksRef}
      className="relative z-[200] w-full flex flex-col gap-[12vh] md:gap-[5vh] md:mb-[20svh] 2md:mb-0 2md:gap-0"
    >
      <AnimatePresence mode="wait">
        {!loading && (
          <>
            {groupedWorks.map((pair, index) => (
              <div
                key={index}
                className="relative z-20 w-full flex flex-col justify-start items-start px-[clamp(16px,_1.4vw,_24px)] gap-[12svh] md:gap-0 md:flex-row"
              >
                {pair.map((project, index) => (
                  <WorkCard
                    key={project.id}
                    index={index}
                    slug={project.slug}
                    title={project.title}
                    niche={project.data.niche}
                    images={project.data.images_collection}
                  />
                ))}
              </div>
            ))}
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
