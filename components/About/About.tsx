"use client";

import { darkCave } from "@/public";
import { MotionValue, useTransform, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { changeTitleAnim } from "../TitleIntro/anim";
import { useInViewBio } from "@/contexts/inViewBio.context";
import { BlurryScrollText } from "@/common/BlurryScrollText/BlurryScrollText";
import { BlurryScrollShortText } from "@/common/BlurryScrollText/BlurryScrollShortText";

interface Props {
  ref: React.RefObject<HTMLDivElement | null>;
  scrollHero: MotionValue<number>;
}

export const About = ({ ref, scrollHero }: Props) => {
  const bioRef = useRef(null);
  const { inViewBio, setInViewBio } = useInViewBio();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInViewBio(true);
          } else {
            if (entry.boundingClientRect.top > 0) {
              setInViewBio(false);
            }
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (bioRef.current) {
      observer.observe(bioRef.current);
    }

    return () => {
      if (bioRef.current) {
        observer.unobserve(bioRef.current);
      }
    };
  }, []);

  const opacity = useTransform(scrollHero, [0, 1], [1, 0.08]);

  return (
    <section
      id="about"
      className="relative z-[-1] w-full pb-[clamp(40px,_24vw,_120px)] mt-[200px]"
    >
      <div
        ref={ref}
        className="relative z-[20] w-full flex justify-start items-start px-[clamp(16px,_1.4vw,_24px)]"
      >
        <div className="hidden w-0 2md:block 2md:w-full" />

        <div className="w-full flex flex-col gap-6">
          <div className="relative w-full max-w-[560px] 2md:w-[clamp(424px,_24vw,_520px)]">
            <motion.div
              style={{
                willChange: "opacity, position, transform",
                ...(inViewBio
                  ? {
                      position: "absolute",
                      transform: "translateY(-100%)",
                      bottom: "inherit",
                      opacity: 1,
                    }
                  : {
                      position: "fixed",
                      opacity,
                    }),
              }}
              className="fixed bottom-0 w-full max-w-[560px] 2md:w-[clamp(424px,_24vw,_520px)"
            >
              <div className="z-[200] relative 2md:hidden 2md:fixed 2md:bottom-0 2md:left-0 flex justify-start items-end 2md:pl-[clamp(16px,_2vw,_24px)] pb-[clamp(16px,_2vw,_24px)] w-[calc(100%_-_20px)]">
                <motion.div
                  variants={changeTitleAnim}
                  animate={inViewBio ? "change" : "initial"}
                  className="relative w-full block"
                  style={{ willChange: "filter, transform" }}
                >
                  <div className="w-full flex justify-start items-end">
                    <svg
                      width="414"
                      height="132"
                      viewBox="0 0 414 132"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-darkBlueCustom w-full h-full"
                      preserveAspectRatio="xMinYMin"
                    >
                      <path d="M360.299 52.8601V36.6601H373.079V7.86011H397.019V36.6601H412.859V52.8601H397.019V101.82C397.019 107.94 400.079 111 406.199 111L413.399 110.82V128.82C409.679 129.06 404.579 129.18 398.099 129.18C391.019 129.18 385.079 127.5 380.279 124.14C375.479 120.66 373.079 114.96 373.079 107.04V52.8601H360.299Z" />
                      <path d="M358.865 129H335.285V118.2H334.745C331.385 122.76 327.665 126.12 323.585 128.28C319.625 130.44 314.525 131.52 308.285 131.52C298.205 131.52 290.345 128.52 284.705 122.52C279.065 116.52 276.245 108.42 276.245 98.2202V36.6602H300.545V94.0802C300.545 105.24 305.645 110.82 315.845 110.82C321.485 110.82 325.985 108.9 329.345 105.06C332.705 101.22 334.385 96.1802 334.385 89.9402V36.6602H358.865V129Z" />
                      <path d="M261.086 117.84C252.086 127.08 240.506 131.7 226.346 131.7C212.186 131.7 200.606 127.08 191.606 117.84C182.606 108.48 178.106 96.8401 178.106 82.9201C178.106 69.0001 182.606 57.4201 191.606 48.1801C200.606 38.8201 212.186 34.1401 226.346 34.1401C240.506 34.1401 252.086 38.8201 261.086 48.1801C270.086 57.4201 274.586 69.0001 274.586 82.9201C274.586 96.8401 270.086 108.48 261.086 117.84ZM226.346 112.98C233.666 112.98 239.366 110.28 243.446 104.88C247.646 99.3601 249.746 92.0401 249.746 82.9201C249.746 73.8001 247.646 66.4801 243.446 60.9601C239.366 55.4401 233.666 52.6801 226.346 52.6801C218.906 52.6801 213.146 55.4401 209.066 60.9601C204.986 66.3601 202.946 73.6801 202.946 82.9201C202.946 92.0401 204.986 99.3601 209.066 104.88C213.146 110.28 218.906 112.98 226.346 112.98Z" />
                      <path d="M141.132 131.7C128.652 131.7 119.472 126.96 113.592 117.48H113.232V129H89.6525V0.300049H114.132V47.82H114.672C120.552 38.7 129.132 34.1401 140.412 34.1401C152.052 34.1401 161.592 38.7 169.032 47.82C176.472 56.82 180.192 68.5201 180.192 82.9201C180.192 97.8001 176.592 109.68 169.392 118.56C162.192 127.32 152.772 131.7 141.132 131.7ZM135.732 111.18C141.972 111.18 146.772 108.72 150.132 103.8C153.612 98.88 155.352 91.9201 155.352 82.9201C155.352 74.0401 153.552 67.0201 149.952 61.8601C146.472 56.58 141.432 53.94 134.832 53.94C120.672 53.94 113.592 63.7801 113.592 83.4601C113.592 91.9801 115.572 98.76 119.532 103.8C123.492 108.72 128.892 111.18 135.732 111.18Z" />
                      <path d="M62.7495 129C61.5495 127.44 60.5895 124.02 59.8695 118.74H59.5095C56.8695 122.7 53.5095 125.76 49.4295 127.92C45.3495 130.08 39.6495 131.16 32.3295 131.16C22.6095 131.16 14.8095 128.7 8.92947 123.78C3.04947 118.86 0.109497 111.9 0.109497 102.9C0.109497 93.5401 3.3495 86.7001 9.8295 82.3801C16.3095 77.9401 25.4295 74.8801 37.1895 73.2001C45.8295 72.0001 51.7095 70.8001 54.8295 69.6001C57.9495 68.2801 59.5095 66.0001 59.5095 62.7601C59.5095 59.4001 58.1895 56.7601 55.5495 54.8401C52.9095 52.8001 49.0695 51.7801 44.0295 51.7801C32.8695 51.7801 26.9295 56.1001 26.2095 64.7401H4.42947C4.78947 55.9801 8.3295 48.7201 15.0495 42.9601C21.7695 37.2001 31.4895 34.3201 44.2095 34.3201C70.1295 34.3201 83.0895 45.6601 83.0895 68.3401V115.32C83.0895 122.28 84.1695 126.54 86.3295 128.1V129H62.7495ZM38.2695 114.06C44.9895 114.06 50.2695 112.32 54.1095 108.84C58.0695 105.36 60.0495 101.22 60.0495 96.4201V82.5601C57.4095 84.1201 51.7095 85.9201 42.9495 87.9601C35.9895 89.5201 31.0695 91.3201 28.1895 93.3601C25.3095 95.2801 23.8695 98.2801 23.8695 102.36C23.8695 110.16 28.6695 114.06 38.2695 114.06Z" />
                    </svg>
                  </div>
                </motion.div>
              </div>

              <h1 className="m-0 font-medium leading-[1.21] pb-[clamp(24px,_2vw,_32px)] text-[clamp(16px,_4.8vw,_24px)] w-full xs:text-[clamp(20px,_1.25vw,_26px)]">
                Product and industrial designer based in Oviedo, focused on
                creating complete product experiences.
              </h1>
            </motion.div>

            <div
              ref={bioRef}
              className="relative flex flex-col pb-[clamp(40px,_8vw,_56px)]"
            >
              <div className="relative bottom-0 z-10 w-full 2md:w-[clamp(424px,_24vw,_520px)]">
                <p className="text100 pb-[clamp(24px,_2vw,_32px)]">
                  <BlurryScrollText
                    text="Hola buenas tardes esto es una prueba de la animacion de texto con blur y scroll, no se que tal funcionará pero quiero ver que tal"
                    className="gap-x-0.5"
                  />
                </p>
                <div className="relative w-full">
                  <Image src={darkCave} alt="" className="w-full" />
                </div>
              </div>
            </div>

            <div className="relative z-[20] flex flex-col pb-[clamp(40px,_8vw,_56px)]">
              <h3 className="m-0 text-[clamp(16px,_4.8vw,_24px)] xs:text-[clamp(20px,_1.25vw,_26px)] font-medium leading-[1.21] pb-[clamp(24px,_2vw,_32px)]">
                <BlurryScrollShortText
                  text="Work Experience"
                  className="gap-x-1.5"
                />
              </h3>

              <div className="flex flex-col pb-[clamp(24px,_2vw,_32px)] last:pb-0">
                <div className="pb-[clamp(8px,_1vw,_12px)]">
                  <p className="text100">
                    <BlurryScrollShortText
                      text="Pelayo Felgueroso Freelance"
                      className="gap-x-1"
                    />
                  </p>
                  <p className="text100 text-darkBlueCustom/60">
                    <BlurryScrollShortText
                      text="May 2023 - Present"
                      className="gap-x-1"
                    />
                  </p>
                </div>

                <div className="">
                  <p className="text100">
                    <BlurryScrollText
                      text="Freelance Product desirner focused on developing complete
                    produt experiences. Analysis and research, developments of
                    concepts, ideas and projects, creation of 3D models, product
                    rendering and presentation."
                      className="gap-x-1"
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className="relative z-[20] flex flex-col">
              <p className="text100">
                <BlurryScrollText
                  text="Do not hesitate to contact me discuss a posible project or <discover more about my work."
                  className="gap-x-1"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
