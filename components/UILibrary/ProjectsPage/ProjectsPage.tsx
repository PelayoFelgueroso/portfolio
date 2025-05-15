"use client";

import Image from "next/image";
import { useState } from "react";
import { Card } from "./components/Card";
import { Work } from "@/models/work";
import useWorkStore, { UseWorkStoreType } from "@/store/useWorkStore";

export const ProjectsPageGrid = () => {
  const { works } = useWorkStore() as UseWorkStoreType;
  const [currentProject, setCurrentProject] = useState<Work | null>(null);

  const handleHover = (work: Work) => {
    setCurrentProject(work);
  };

  const handleNoHover = () => {
    setCurrentProject(null);
  };

  return (
    <main className="relative z-10 bg-customWhite">
      <section className="h-screen w-full">
        <div className="h-full w-full px-4 flex items-center justify-center">
          <h1 className="h1">Projects</h1>
        </div>
      </section>
      <section className="w-full px-4">
        <div className="fixed w-sreen h-screen inset-0">
          {works.map((project) => (
            <div
              key={project.id}
              className={`absolute inset-0 w-full h-full opacity-0 transition-all duration-1000 ${
                currentProject?.id === project.id ? "opacity-100" : ""
              }`}
            >
              <Image
                src={project.data.featured_image.url}
                width={1920}
                height={1080}
                alt={project.title}
                className="h-full w-full object-cover blur-[20px]"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col lg:gap-40">
          {works.map((project) => (
            <div
              key={project.id}
              className="h-screen w-full flex items-center justify-center"
            >
              <Card
                onMouseEnter={() => handleHover(project)}
                onMouseLeave={handleNoHover}
                featured_image={project.data.featured_image.url}
                featured_image_mobile={project.data.featured_image_mobile.url}
                featured_video={project.data.featured_video.url}
                title={project.title}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
