"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MotionValue } from "framer-motion";
import { TareasCard } from "./TareasCard";
import { FormattedTarea } from "@/models/tareas-conquer";

interface Props {
  scrollProgress?: MotionValue<number>;
  filteredTareas: FormattedTarea[];
  tareas: FormattedTarea[];
  onFilterChange: (resources: FormattedTarea[]) => void;
}

export const TareasContainer = ({
  filteredTareas,
  tareas,
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
          {filteredTareas.length === 0 && (
            <div className="">
              There are no tareas for your Search, please try again or{" "}
              <button
                onClick={() => onFilterChange(tareas)}
                className="cursor-pointer"
              >
                See All
              </button>
            </div>
          )}
          {(allVisible ? filteredTareas : filteredTareas.slice(0, 6)).map(
            (resource) => (
              <TareasCard
                slug={resource.slug}
                key={resource.id}
                title={resource.title.rendered}
                featured_image={resource.featured_image}
              />
            )
          )}
        </div>
        {tareas.length > 6 && (
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
