"use client";

import React from "react";
import { WorkShowcase } from "./components/WorkShowcase";
import useWorkStore, { UseWorkStoreType } from "@/store/useWorkStore";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";

interface Props {
  slug: string;
}

export const SingleWorkPageTemplate = React.memo<Props>(({ slug }: Props) => {
  const { works, loading, error } = useWorkStore() as UseWorkStoreType;

  if (loading) {
    return <LoadingSpinner message="Loading project..." fullScreen />;
  }

  if (error) {
    return (
      <div className="relative w-full min-h-screen flex items-center justify-center bg-whiteCustom">
        <div className="text-center px-4">
          <h2 className="text300 text-darkBlueCustom/90 mb-4">Error loading project</h2>
          <p className="text100 text-[#393939] mb-6">Please try refreshing the page</p>
          <a href="/works" className="text-[#1f77ff] hover:underline">
            ← Back to projects
          </a>
        </div>
      </div>
    );
  }

  const work = works?.find((item) => item?.slug === slug);

  if (!work) {
    return (
      <div className="relative w-full min-h-screen flex items-center justify-center bg-whiteCustom">
        <div className="text-center px-4">
          <h2 className="text300 text-darkBlueCustom/90 mb-4">Project not found</h2>
          <p className="text100 text-[#393939] mb-6">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <a href="/works" className="text-[#1f77ff] hover:underline">
            ← Back to projects
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-whiteCustom">
      <WorkShowcase work={work} />
    </div>
  );
});

SingleWorkPageTemplate.displayName = "SingleWorkPageTemplate";
