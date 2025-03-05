"use client";

import { Category } from "@/models/Resource";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import styles from "./style.module.scss";

interface Props {
  title: string;
  short_description: string;
  featured_image: string;
  featured_video: string;
  categories: Category[];
  slug: string;
}

export const Card = ({
  title,
  short_description,
  featured_image,
  featured_video,
  categories,
  slug,
}: Props) => {
  const video = useRef<HTMLVideoElement | null>(null);

  const handleHover = () => {
    video.current?.play();
  };
  const handleNoHover = () => {
    video.current?.pause();
  };

  return (
    <Link
      onMouseEnter={() => handleHover()}
      onMouseLeave={() => handleNoHover()}
      href={`/resources/${slug}`}
      className={`${styles.resource_wrapper}`}
    >
      <div className="flex flex-col justify-between w-full overflow-hidden rounded-lg bg-foreground text-background p-2">
        <div className={`h-[250px] overflow-hidden relative ${styles.top_wrapper}`}>
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
          <Link
            target="_blank"
            href={`/resources/demos/${slug}`}
            className={`absolute bottom-2 right-2 rounded-full flex justify-center items-center gap-2 px-4 py-2 bg-blue-500 z-[1000] ${styles.demo}`}
          >
            Demo
            <svg
              width="9"
              height="8"
              viewBox="0 0 9 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`w-3 h-3 ${styles.arrow}`}
            >
              <path
                d="M8.49966 1.01851C8.50988 0.742553 8.29446 0.510563 8.01851 0.500342L3.52159 0.33379C3.24564 0.32357 3.01365 0.538989 3.00343 0.814942C2.99321 1.09089 3.20862 1.32288 3.48458 1.33311L7.48184 1.48115L7.33379 5.47841C7.32357 5.75436 7.53899 5.98635 7.81494 5.99657C8.09089 6.0068 8.32288 5.79138 8.3331 5.51542L8.49966 1.01851ZM1.34023 7.8664L8.34023 1.3664L7.65977 0.633603L0.659774 7.1336L1.34023 7.8664Z"
                fill="white"
              ></path>
            </svg>
          </Link>
        </div>

        <div className="flex flex-col justify-end h-1/2  z-20 px-5 py-[18px] lg:p-[14px]">
          <div className="flex gap-2">
            {categories.map((item) => (
              <span
                key={item.id}
                className="w-fit uppercase text-[.7rem] border px-2 py-1 rounded-full"
              >
                {item.name}
              </span>
            ))}
          </div>

          <h3 className="mt-[.8rem] mb-[.3rem] text-[1.2rem]">{title}</h3>
          <p className="text-[.9rem] font-thin">{short_description}</p>
        </div>
      </div>
    </Link>
  );
};
