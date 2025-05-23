import { Work } from "@/models/work";
import { WorkSlider } from "./Components/WorkSlider";

interface Props {
  works: Work[];
}

export const WorksShowcase = ({ works }: Props) => {
  return (
    <section className="relative z-[200] flex flex-col bg-whiteCustom">
      <div className="relative z-[100] w-full flex flex-col gap-[clamp(32px,_8vw,_48px)]">
        {works.map((work, index) => (
          <WorkSlider
            key={work.id}
            slug={work.slug}
            title={work.title}
            niche={work.data.niche}
            images={work.data.images_collection}
            nextWork={works[index]}
          />
        ))}
      </div>
    </section>
  );
};
