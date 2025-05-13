import { useEffect, useRef, useState } from "react";
import { AnimatePresence, useInView, motion } from "framer-motion";
import { FilterWrapper } from "../components/FilterWrapper/FilterWrapper";
import { StaticResourcesContainer } from "./components/StaticResourcesContainer";
import useResourceStore, { useResourceType } from "@/store/useResourceStore";

export const ResourcesGrid = () => {
  const { resources, loading } = useResourceStore() as useResourceType;

  const [filteredResources, setFilteredResources] = useState(resources);
  const container = useRef(null);

  useEffect(() => {
    setFilteredResources(resources);
  }, [resources]);

  const inView = useInView(container);

  return (
    <>
      <section
        ref={container}
        id="resources"
        className="relative pb-[200px] px-4"
      >
        <div className="perspective-distant w-full xl:max-w-[1600px] mx-auto min-h-[75vh]">
          <motion.div
            className={`perspective-distant relative grid-18 _1row p-3 rounded-lg gap-3 flex-col md:flex-row`}
            style={{
              willChange: "opacity",
            }}
          >
            <AnimatePresence mode="wait">
              {!loading && (
                <StaticResourcesContainer
                  resources={resources}
                  filteredResources={filteredResources}
                  onFilterChange={setFilteredResources}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <FilterWrapper
        onFilterChange={setFilteredResources}
        inViewResources={inView}
      />
    </>
  );
};
