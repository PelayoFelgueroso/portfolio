import { Work } from "@/models/work";
import { WorkCard } from "./Components/WorkCard";

interface Props {
  works: Work[];
}

export const WorksGrid = ({ works }: Props) => {
  return (
    <section className="relative flex flex-col bg-whiteCustom">
      <div className="relative w-[calc(100%_-_35px)] xs:w-[calc(100%_-_50px)] md:w-[calc(100%_-_70px)] 2md:w-[calc(100%_-_150px)] mx-auto flex flex-wrap pt-[25px] xs:pt-[35px] md:pt-[45px] 2md:pt-[75px]">
        {works.map((work) => (
          <WorkCard
            key={work.id}
            slug={work.slug}
            title={work.title}
            niche={work.data.niche}
            image={work.data.featured_image}
            bg={work.data.featured_image}
            date={work.data.date}
          />
        ))}
      </div>
    </section>
  );
};
