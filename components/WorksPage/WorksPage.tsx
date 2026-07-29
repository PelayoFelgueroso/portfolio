"use client";

import React from "react";
import { WorksGrid } from "./WorksGrid/WorksGrid";
import useWorkStore, { UseWorkStoreType } from "@/store/useWorkStore";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";

export const WorksPageTemplate = React.memo(() => {
  const { works, loading, error } = useWorkStore() as UseWorkStoreType;

  if (loading) {
    return <LoadingSpinner message="Loading projects..." fullScreen />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-whiteCustom">
        <div className="text-center px-4">
          <h2 className="text300 text-darkBlueCustom/90 mb-4">Error loading projects</h2>
          <p className="text100 text-[#393939]">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  if (!works || works.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-whiteCustom">
        <div className="text-center px-4">
          <h2 className="text300 text-darkBlueCustom/90 mb-4">No projects found</h2>
          <p className="text100 text-[#393939]">Check back soon for new content</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[69px] pb-[clamp(40px,_24vw,_120px)] bg-whiteCustom">
      <WorksGrid works={works} />
    </div>
  );
});

WorksPageTemplate.displayName = "WorksPageTemplate";
