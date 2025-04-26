import { FormattedProject } from "@/models/project";
import { WorkSlider } from "./Components/WorkSlider";

interface Props {
  work: FormattedProject;
  nextWork: FormattedProject;
}

export const WorkShowcase = ({ work, nextWork }: Props) => {
  return (
    <section className="relative z-[200] flex flex-col bg-whiteCustom">
      <div className="relative z-[100] w-full flex flex-col gap-[clamp(32px,_8vw,_48px)]">
        <WorkSlider
          key={work.id}
          slug={work.slug}
          title={work.title.rendered}
          niche={work.acf.niche}
          images={work.images_collection}
          nextWork={nextWork}
        />
      </div>
    </section>
  );
};
