"use client";

import { useProjects } from "@/contexts/Projects.context";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import styles from "../style.module.scss";

export const WorksInteractive = () => {
  const { projects } = useProjects();
  const [currentWork, setCurrentWork] = useState(projects[0]);

  const video = useRef<HTMLVideoElement | null>(null);

  const handleHover = () => {
    video.current?.play();
  };
  const handleNoHover = () => {
    video.current?.pause();
  };

  if (projects.length === 0) {
    return <div></div>;
  }

  return (
    <>
      <div
        className={`col-start-1 col-end-4 rounded-3xl overflow-hidden w-full h-full bg-whiteCustom text-black`}
      >
        <div className="flex flex-col h-full items-center lg:items-start justify-center gap-6 lg:pl-6">
          {projects.slice(0, 4).map((project, index) => (
            <div
              key={project.id}
              className={`${
                currentWork.id === project.id ? "block" : "hidden lg:block"
              } group cursor-pointer`}
              onMouseEnter={() => setCurrentWork(projects[index])}
            >
              <div className="hidden lg:flex items-center space-x-2 mb-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className={`h-[1px] w-6 bg-black ${
                    currentWork.id === project.id
                      ? "w-12 bg-gray-800"
                      : "group-hover:w-12 group-hover:bg-gray-600"
                  } transition-all duration-300`}
                />
                <ChevronRight
                  className={`h-4 w-4 text-gray-400 transform ${
                    currentWork.id === project.id
                      ? "translate-x-1 text-gray-800"
                      : "translate-x-0"
                  } group-hover:translate-x-1 group-hover:text-gray-600 transition-all duration-300`}
                />
              </div>
              <h2
                className={`text-xl font-light uppercase ${
                  currentWork.id === project.id
                    ? "text-gray-900"
                    : "text-gray-500"
                } group-hover:text-gray-900 transition-colors duration-300`}
              >
                {project.title.rendered}
              </h2>
              <div
                className={`mt-3 overflow-hidden transition-all duration-500 ${
                  currentWork.id === project.id
                    ? "max-h-20 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <span className="inline-block py-1.5 px-3 bg-gray text-gray-800 text-sm font-medium rounded-md">
                  {project.acf.niche}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`${styles.image_wrapper} relative col-start-5 col-end-[15] w-full max-h-full h-fit rounded-3xl overflow-hidden shadow-2xl`}
      >
        <div
          onMouseEnter={handleHover}
          onMouseLeave={handleNoHover}
          className=""
        >
          <Image
            src={currentWork.featured_image}
            width={1920}
            height={1080}
            alt={currentWork.title.rendered}
            className={`object-contain ${styles.image}`}
          />
          <video
            key={currentWork.featured_video}
            ref={video}
            className={`w-full object-contain ${styles.video}`}
            loop
            muted
            playsInline
          >
            <source src={currentWork.featured_video} type="video/mp4" />
            Tu navegador no soporta videos.
          </video>
          <Link
            target="_blank"
            href={currentWork.acf.live_demo}
            className={`absolute bottom-4 right-4 rounded-full flex justify-center items-center gap-2 px-4 py-2 bg-blue-500 z-[1000] text-white ${styles.demo}`}
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
      </div>

      <div className="col-start-[15] col-end-[19] w-full p-8 flex flex-col justify-center ">
        <div className="space-y-6">
          <div className="h-[1px] w-12 bg-black"></div>
          <h3 className="text-xl font-light uppercase">
            {currentWork.title.rendered}
          </h3>
          <div className="relative overflow-hidden">
            <p className="text-black leading-relaxed">
              {currentWork.acf.description}
            </p>
            <div className="mt-8">
              <Link
                href={`/projects/${currentWork.slug}`}
                className="group flex items-center space-x-2 text-sm text-[#333333] hover:text-[#1a1a1a] transition-colors duration-300"
              >
                <span>Explorar más</span>
                <span className="inline-block w-5 h-[1px] bg-[#333333] group-hover:w-8 group-hover:bg-gray-800 transition-all duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
