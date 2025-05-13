import { Work } from "@/models/work";
import { WorkSlider } from "./Components/WorkSlider";

interface Props {
  work: Work;
  nextWork: Work;
}

export const WorkShowcase = ({ work, nextWork }: Props) => {
  return (
    <section className="relative z-[200] h-full flex flex-col bg-whiteCustom">
      <div className="relative z-[100] w-full h-full flex flex-col gap-[clamp(32px,_8vw,_48px)]">
        <WorkSlider
          key={work.id}
          slug={work.slug}
          title={work.title}
          niche={work.data.niche}
          images={work.data.images_collection}
          description={work.data.description}
          date={work.data.date}
          services={work.data.services}
          nextWork={nextWork}
        />
      </div>
    </section>
  );
};
