import { FormattedProject } from "@/models/project";
import { WorkCard } from "./components/WorkCard";
import { useProjects } from "@/contexts/Projects.context";
import { AnimatePresence, useInView } from "framer-motion";
import { useEffect } from "react";

interface Props {
  onInViewChange: (visible: boolean) => void;
  worksRef: React.RefObject<HTMLDivElement | null>;
}

export const Projects = ({ onInViewChange, worksRef }: Props) => {
  const { loadingProjects, projects } = useProjects();

  const inView = useInView(worksRef, { once: false });

  useEffect(() => {
    onInViewChange(inView);
  }, [inView, onInViewChange]);

  const groupedProjects = projects.reduce<FormattedProject[][]>(
    (acc, project, index) => {
      if (index % 2 === 0) acc.push([project]);
      else acc[acc.length - 1].push(project);
      return acc;
    },
    []
  );

  return (
    <section
      id="projects"
      ref={worksRef}
      className="relative z-[200] w-full flex flex-col gap-[12vh] md:gap-[5vh] md:mb-[20svh] 2md:mb-0 2md:gap-0"
    >
      <AnimatePresence mode="wait">
        {!loadingProjects && (
          <>
            {groupedProjects.map((pair, index) => (
              <div
                key={index}
                className="relative z-20 w-full flex flex-col justify-start items-start px-[clamp(16px,_1.4vw,_24px)] gap-[12svh] md:gap-0 md:flex-row"
              >
                {pair.map((project, index) => (
                  <WorkCard
                    key={project.id}
                    index={index}
                    slug={project.slug}
                    title={project.title.rendered}
                    niche={project.acf.niche}
                    images={project.images_collection}
                  />
                ))}
              </div>
            ))}{" "}
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
