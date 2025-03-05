"use client";

import styles from "./style.module.scss";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useProjects } from "@/contexts/Projects.context";

export const Works = () => {
  const projects = useProjects();
  const [currentWork, setCurrentWork] = useState(projects[0]);
  console.log(projects);

  return (
    <section id="works" className="mt-[200px] h-screen">
      <div className="grid-18 _1row items-center max-w-[1600px] mx-auto h-[80vh] p-3 bg-[#1a1a1a] shadow-2xl rounded-2xl border-gray border-[1px]">
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
          className={`col-start-5 col-end-[15] w-full max-h-full h-fit rounded-3xl overflow-hidden bg-black text-white`}
        >
          <Link href={`/${currentWork.slug}`}>
            <div className="">
              <Image
                width={1920}
                height={1080}
                src={currentWork.meta.featured_image}
                alt={currentWork.title.rendered}
                className="object-contain object-center h-full w-full"
              />
            </div>
          </Link>
        </div>

        <div
          className={`${styles.description_wrapper} h-full rounded-3xl overflow-hidden bg-black text-white`}
        >
          <div className="">
            <p className="">{currentWork.meta.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
