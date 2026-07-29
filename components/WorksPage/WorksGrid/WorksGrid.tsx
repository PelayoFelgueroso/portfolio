import React from "react";
import { Work } from "@/models/work";
import { WorkCard } from "./Components/WorkCard";

interface Props {
  works: Work[];
}

export const WorksGrid = React.memo<Props>(({ works }: Props) => {
  // Validar que works sea un array
  const validWorks = Array.isArray(works) ? works : [];

  // Filtrar works que tengan los datos mínimos necesarios
  const worksWithData = validWorks.filter((work) => {
    return (
      work &&
      work.id &&
      work.slug &&
      work.title &&
      work.data?.images_collection?.[0]?.url &&
      work.data?.featured_image?.url
    );
  });

  return (
    <section className="relative flex flex-col bg-whiteCustom">
      <div className="relative w-[calc(100%_-_35px)] xs:w-[calc(100%_-_50px)] md:w-[calc(100%_-_70px)] 2md:w-[calc(100%_-_150px)] mx-auto flex flex-wrap pt-[25px] xs:pt-[35px] md:pt-[45px] 2md:pt-[75px]">
        {worksWithData.map((work) => (
          <WorkCard
            key={work.id}
            slug={work.slug}
            title={work.title}
            niche={work.data?.niche || "Project"}
            image={work.data.images_collection[0]}
            bg={work.data.featured_image}
            date={work.data?.date || ""}
          />
        ))}
      </div>
    </section>
  );
});

WorksGrid.displayName = "WorksGrid";
