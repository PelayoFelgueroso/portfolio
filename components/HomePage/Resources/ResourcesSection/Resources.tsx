import { useEffect, useState } from "react";
import {
  AnimatePresence,
  useInView,
  useScroll,
  motion,
  useTransform,
} from "framer-motion";
import { useResources } from "@/contexts/Resources.context";
import { ResourcesContainer } from "./components/ResourcesContainer";
import { FilterWrapper } from "../components/FilterWrapper/FilterWrapper";

interface Props {
  onInViewChange: (visible: boolean) => void;
  resourcesRef: React.RefObject<HTMLDivElement | null>;
}

export const Resources = ({ onInViewChange, resourcesRef }: Props) => {
  const { loadingResources, loadingCategories, resources } = useResources();
  const [filteredResources, setFilteredResources] = useState(resources);

  useEffect(() => {
    setFilteredResources(resources);
  }, [resources]);

  const inView = useInView(resourcesRef, { once: false });

  useEffect(() => {
    onInViewChange(inView);
  }, [inView, onInViewChange]);

  const inViewFilters = useInView(resourcesRef, {
    once: false,
    margin: "-750px 0px -500px 0px",
  });

  const { scrollYProgress } = useScroll({
    target: resourcesRef,
    offset: ["start 100%", "start 40%"],
  });

  const z = useTransform(scrollYProgress, [0, 1], ["-20rem", "0rem"]);
  const rotateX = useTransform(scrollYProgress, [0, 1], ["30deg", "0deg"]);

  return (
    <>
      <section id="resources" className="relative pb-[200px] px-4">
        <div
          ref={resourcesRef}
          className="perspective-distant w-full xl:max-w-[1600px] mx-auto min-h-[75vh]"
        >
          <motion.div
            className={`perspective-distant relative grid-18 _1row p-3 rounded-lg gap-3 flex-col md:flex-row`}
            style={{
              willChange: "transform",
              z,
              rotateX,
            }}
          >
            <div
              className={`absolute inset-0 shadow-2xl border-[1px] border-grayCustom rounded-lg bg-white`}
            />
            <AnimatePresence mode="wait">
              {!loadingCategories && !loadingResources && (
                <ResourcesContainer
                  resources={resources}
                  filteredResources={filteredResources}
                  scrollProgress={scrollYProgress}
                  onFilterChange={setFilteredResources}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <FilterWrapper
        onFilterChange={setFilteredResources}
        inViewResources={inViewFilters}
      />
    </>
  );
};
