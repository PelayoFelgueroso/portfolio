import { useScroll, useTransform, motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRef } from "react";

interface Props {
  img: StaticImageData;
  title: string;
  slug: string;
}

export const ProjectCard = ({ img, title, slug }: Props) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 100%", "end 0%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={container}
      className="text-base grid grid-cols-1 md:grid-cols-12 gap-[1.5em] px-[1.5em] py-[1.5em] md:py-em-[32] lg:py-[90px]"
    >
      <div className="relative md:col-[3/11] 3xl:col-[4/10]">
        <div className="flex items-center justify-center">
          <div className="w-full">
            <Link
              href={slug}
              className="img-container w-full aspect-video block rounded-3xl overflow-clip work-item"
            >
              <motion.div style={{ willChange: "transform", y }}>
                <Image
                  className="object-cover size-full work-item-image"
                  src={img}
                  alt={title}
                  style={{
                    transform: "perspective(450px)",
                  }}
                />
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
