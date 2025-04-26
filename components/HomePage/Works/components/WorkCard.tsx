import { BlurryHoverText } from "@/common/BlurryHoverText/BlurryHoverText";
import { Magnetic } from "@/common/Magnetic/Magnetic";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  index: number;
  slug: string;
  title: string;
  niche: string;
  images: string[];
}

export const WorkCard = ({ index, slug, title, niche, images }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 650);
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  return (
    <div
      className={`w-full min-h-[auto] py-6 flex ${
        index === 0 ? "justify-start items-start" : "justify-end items-end"
      } md:justify-center 2md:min-h-[100svh]`}
    >
      <Magnetic max={0.3}>
        <motion.a
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          href={`#projects/${slug}`}
          className="relative h-[clamp(260px,_24vw,_380px)] max-h-[216px] flex justify-center items-center md:max-h-[440px] rounded-lg overflow-hidden project-preview"
        >
          <AnimatePresence mode="wait">
            {isHovered && (
              <Magnetic max={0.1}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.5 } }}
                  className="coarse:hidden absolute z-20 h-full w-full p-4 text-whiteCustom flex flex-col gap-2 justify-center items-center"
                >
                  <h3 className="relative w-full text-center text-whiteCustom m-0 text-[clamp(16px,_2.2vw,_22px)] font-[500] leading-[1.21] uppercase">
                    <BlurryHoverText text={title} />
                  </h3>
                  <p className="relative w-full text-center text-[14px] xs:text-[clamp(14px,_.7vw,_16px)] mb-0">
                    <BlurryHoverText text={niche} />
                  </p>
                </motion.div>
              </Magnetic>
            )}
          </AnimatePresence>

          <div className="relative z-10 h-full flex justify-center items-center bg-whiteCustom overflow-hidden">
            {images.map((image, index) => (
              <motion.img
                key={index}
                style={
                  currentImageIndex === index ? { opacity: 1 } : { opacity: 0 }
                }
                src={image}
                loading="lazy"
                className={`${
                  index === 0 ? "relative w-auto" : "absolute w-full"
                }  h-full z-50 object-cover`}
              />
            ))}
            <AnimatePresence mode="wait">
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.5, delay: 0.2 },
                  }}
                  className="absolute top-0 left-0 inset-0 z-[100] w-full h-full bg-[#0000008c]"
                />
              )}
            </AnimatePresence>
          </div>
        </motion.a>
      </Magnetic>
    </div>
  );
};
