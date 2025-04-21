"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import styles from "./style.module.scss";
import { truncateText } from "@/lib/utils";
import { motion, MotionValue, useTransform } from "framer-motion";

interface Props {
  title: string;
  short_description: string;
  featured_image: string;
  featured_video: string;
  categories: string[];
  slug: string;
  scrollProgress: MotionValue<number>;
  index: number;
}

export const Card = ({
  title,
  short_description,
  featured_image,
  featured_video,
  categories,
  slug,
  scrollProgress,
  index,
}: Props) => {
  const video = useRef<HTMLVideoElement | null>(null);

  const handleHover = () => {
    video.current?.play();
  };
  const handleNoHover = () => {
    video.current?.pause();
  };

  const x = useTransform(scrollProgress, [0, 1], ["10rem", "0rem"]);
  const opacity = useTransform(scrollProgress, [0, 1], [0, 1]);

  const end = 1 - index * 0.1;

  return (
    <motion.div
      onMouseEnter={handleHover}
      onMouseLeave={handleNoHover}
      className={`${styles.resource_wrapper} flex flex-col justify-between w-full overflow-hidden rounded-lg bg-whiteCustom text-black p-2 max-w-[400px] border-[1px] border-grayCustom`}
      style={{
        willChange: "opacity, transform",
        z: useTransform(scrollProgress, [0, end], ["35rem", "0rem"]),
        x,
        opacity,
      }}
    >
      <div
        className={`h-[200px] rounded-lg overflow-hidden relative ${styles.top_wrapper} resource-card`}
      >
        <Link target="_blank" href={`/resources/demos/${slug}`}>
          <Image
            src={featured_image}
            width={300}
            height={300}
            alt="title"
            className={`object-cover w-full h-full ${styles.image}`}
          />
          <video
            ref={video}
            className={`w-full h-full object-cover ${styles.video}`}
            width="100%"
            height="auto"
            loop
            muted
            playsInline
          >
            <source src={featured_video} type="video/mp4" />
            Tu navegador no soporta videos.
          </video>
        </Link>
      </div>

      <Link
        href={`/resources/${slug}`}
        className="flex flex-col justify-end h-1/2  z-20 px-5 py-[18px] lg:p-[14px]"
      >
        <div className="flex gap-2">
          {categories.map((category, index) => (
            <span
              key={index}
              className="w-fit uppercase text-[.7rem] border border-blackCustom px-2 py-1 rounded-full"
            >
              {category}
            </span>
          ))}
        </div>

        <h3 className="mt-[.8rem] mb-[.3rem] text300">{title}</h3>
        <p className="text100 text-darkBlueCustom/75">
          {truncateText(short_description, 95)}
        </p>
      </Link>
    </motion.div>
  );
};
