"use client";

import styles from "./style.module.scss";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useProjects } from "@/contexts/Projects.context";

export const Works = () => {
  const projects = useProjects();
  const [currentWork, setCurrentWork] = useState(projects[0]);

  useEffect(() => {
    console.log(currentWork);
  }, [currentWork]);

  const video = useRef<HTMLVideoElement | null>(null);

  const handleHover = () => {
    video.current?.play();
  };
  const handleNoHover = () => {
    video.current?.pause();
  };

  return (
    <section id="works" className="mt-[200px] h-screen px-4 md:px-0">
      <div className="grid-18 _1row items-center max-w-[1600px] md:mx-auto md:h-[80vh] p-3 bg-[#1a1a1a] shadow-2xl rounded-2xl border-gray border-[1px] flex-col gap-6">
        <div
          className={`col-start-1 col-end-5 rounded-3xl overflow-hidden w-full h-full bg-black text-white border-gray border-[1px]`}
        >
          <div className="flex flex-col h-full items-center justify-center">
            {projects.slice(0, 4).map((project, index) => (
              <div
                key={project.id}
                onMouseEnter={() => setCurrentWork(projects[index])}
                className={`${styles.title_item} ${
                  project === currentWork ? styles.active : ""
                }`}
              >
                <h3 className="uppercase text-[30px] font-black">
                  {project.title.rendered}
                </h3>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`${styles.image_wrapper} relative col-start-5 col-end-[15] w-full max-h-full h-fit rounded-3xl overflow-hidden bg-black text-white`}
        >
          <Link
            onMouseEnter={handleHover}
            onMouseLeave={handleNoHover}
            href={`/${currentWork.slug}`}
          >
            <div className="">
              <Image
                src={currentWork.meta.featured_image}
                width={1920}
                height={1080}
                alt={currentWork.title.rendered}
                className={`object-contain ${styles.image}`}
              />
              <video
                key={currentWork?.meta?.featured_video}
                ref={video}
                className={`w-full object-contain ${styles.video}`}
                loop
                muted
                playsInline
              >
                <source
                  src={currentWork.meta.featured_video}
                  type="video/mp4"
                />
                Tu navegador no soporta videos.
              </video>
              <Link
                target="_blank"
                href={currentWork.meta.live_demo}
                className={`absolute bottom-4 right-4 rounded-full flex justify-center items-center gap-2 px-4 py-2 bg-blue-500 z-[1000] ${styles.demo}`}
              >
                View Online
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
          </Link>
        </div>

        <div
          className={`${styles.description_wrapper} col-start-[15] col-end-[19] w-full h-full rounded-xl lg:rounded-3xl overflow-hidden bg-black text-white`}
        >
          <div className="p-3">
            <p className="text-center md:text-start">{currentWork.meta.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
