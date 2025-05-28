import useWorkStore, { UseWorkStoreType } from "@/store/useWorkStore";
import { AnimatePresence, useInView, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import { WorkBg } from "./components/WorkBg";
import { WorkImg } from "./components/WorkImg";

interface Props {
  onInViewChange: (visible: boolean) => void;
  worksRef: React.RefObject<HTMLDivElement | null>;
}

export const WorksNew = ({ onInViewChange, worksRef }: Props) => {
  const inView = useInView(worksRef, { once: false });
  const { works, loading } = useWorkStore() as UseWorkStoreType;
  const container = useRef(null);

  useEffect(() => {
    onInViewChange(inView);
  }, [inView, onInViewChange]);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["0% 0%", "100% 100%"],
  });

  return (
    <section
      id="works"
      ref={worksRef}
      className="relative z-[200] w-full flex flex-col gap-[12vh] md:gap-[5vh] md:mb-[20svh] 2md:gap-0"
    >
      <div ref={container} className="h-[300vh]">
        <AnimatePresence mode="wait">
          {!loading && (
            <div className="sticky top-0 h-screen">
              <div className="">
                <div className="absolute top-0 w-full h-screen overflow-hidden">
                  {works.map((work, index) => (
                    <WorkBg
                      key={work.id}
                      index={index}
                      totalItems={works.length}
                      scrollProgress={scrollYProgress}
                      image={work.data.featured_image_mobile.url}
                    />
                  ))}
                </div>
              </div>

              <div className="">
                <div className="absolute top-0 z-[5] w-full h-screen flex justify-center items-center overflow-hidden">
                  <div className="relative w-[40vw] h-[40vw] md:w-[20vw] md:h-[20vw] shadow-lg overflow-hidden rounded-lg ">
                    {works.map((work, index) => (
                      <WorkImg
                        key={work.id}
                        index={index}
                        totalItems={works.length}
                        scrollProgress={scrollYProgress}
                        slug={work.slug}
                        image={work.data.featured_image.url}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="">
                <div className=""></div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
