"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, useInView, motion } from "framer-motion";
import { FilterWrapper } from "../components/FilterWrapper/FilterWrapper";
import { StaticResourcesContainer } from "./components/StaticResourcesContainer";
import useResourceStore, { useResourceType } from "@/store/useResourceStore";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";

export const ResourcesGrid = React.memo(() => {
  const { resources, loading, error } = useResourceStore() as useResourceType;

  const [filteredResources, setFilteredResources] = useState(resources);
  const container = useRef(null);

  useEffect(() => {
    setFilteredResources(resources);
  }, [resources]);

  const inView = useInView(container);

  if (loading) {
    return <LoadingSpinner message="Loading resources..." fullScreen={true} />;
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text300 text-darkBlueCustom/90 mb-4">Error loading resources</h2>
          <p className="text100 text-[#393939]">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section
        ref={container}
        id="resources"
        className="relative px-4"
      >
        <div className="perspective-distant w-full xl:max-w-[1600px] mx-auto min-h-[75vh]">
          <motion.div
            className={`perspective-distant relative grid-18 _1row p-3 rounded-lg gap-3 flex-col md:flex-row`}
            style={{
              willChange: "opacity",
            }}
          >
            <AnimatePresence mode="wait">
              {!loading && resources && (
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
});

ResourcesGrid.displayName = "ResourcesGrid";
