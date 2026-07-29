"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import { ResourcesSidebar } from "./components/ResourceArticle/components/ResourcesSidebar/ResourcesSidebar";
import { ResourceArticle } from "./components/ResourceArticle/ResourceArticle";
import useResourceStore, { useResourceType } from "@/store/useResourceStore";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";

interface Props {
  slug: string;
}

export const ResourcesArticlePage = React.memo<Props>(({ slug }: Props) => {
  const { resources, loading, error } = useResourceStore() as useResourceType;

  if (loading) {
    return <LoadingSpinner message="Loading resource..." fullScreen />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-whiteCustom">
        <div className="text-center px-4">
          <h2 className="text300 text-darkBlueCustom/90 mb-4">Error loading resource</h2>
          <p className="text100 text-[#393939] mb-6">Please try refreshing the page</p>
          <a href="/resources" className="text-[#1f77ff] hover:underline">
            ← Back to resources
          </a>
        </div>
      </div>
    );
  }

  const resource = resources?.find((resource) => resource?.slug === slug);

  if (!resource) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-whiteCustom">
        <div className="text-center px-4">
          <h2 className="text300 text-darkBlueCustom/90 mb-4">Resource not found</h2>
          <p className="text100 text-[#393939] mb-6">
            The resource you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <a href="/resources" className="text-[#1f77ff] hover:underline">
            ← Back to resources
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full px-[clamp(16px,_1.4vw,_24px)] flex justify-center gap-[30px] min-[1400px]:gap-[50px] font-outfit">
      <AnimatePresence mode="wait">
        {resources && resources.length > 0 && (
          <div className="absolute left-0 pl-[clamp(16px,_1.4vw,_24px)]">
            <ResourcesSidebar />
          </div>
        )}
      </AnimatePresence>

      <ResourceArticle resource={resource} />
    </div>
  );
});

ResourcesArticlePage.displayName = "ResourcesArticlePage";
