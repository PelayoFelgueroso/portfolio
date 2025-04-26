"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card } from "./Card";
import { MotionValue } from "framer-motion";
import { FormattedResource } from "@/models/resource";

interface Props {
  scrollProgress: MotionValue<number>;
  filteredResources: FormattedResource[];
  resources: FormattedResource[];
  onFilterChange: (resources: FormattedResource[]) => void;
}

export const ResourcesContainer = ({
  scrollProgress,
  filteredResources,
  resources,
  onFilterChange,
}: Props) => {
  const [allVisible, setAllVisible] = useState(false);

  const toggleSeeAll = () => {
    setAllVisible((prev) => !prev);
  };

  return (
    <>
      <div className="perspective-distant col-start-1 col-end-[19] flex flex-col gap-8">
        <div className="perspective-distant grid xs:grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(4,1fr)] w-full md:gap-4 sm:gap-5 gap-4">
          {filteredResources.length === 0 && (
            <div className="">
              There are no resources for your Search, please try again or{" "}
              <button
                onClick={() => onFilterChange(resources)}
                className="cursor-pointer"
              >
                See All
              </button>
            </div>
          )}
          {(allVisible ? filteredResources : filteredResources.slice(0, 6)).map(
            (resource, index) => (
              <Card
                slug={resource.slug}
                key={resource.id}
                title={resource.title.rendered}
                short_description={resource.acf.short_description}
                featured_image={resource.featured_image}
                featured_video={resource.featured_video}
                categories={resource.category_name}
                scrollProgress={scrollProgress}
                index={index}
              />
            )
          )}
        </div>
        {resources.length > 6 && (
          <div className="w-full flex justify-center items-center">
            <Button
              onClick={toggleSeeAll}
              className="bg-blueCustom hover:bg-blue-700"
            >
              {allVisible ? "See Less" : "See All"}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
