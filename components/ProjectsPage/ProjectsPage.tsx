'use client';

import { useProjects } from "@/contexts/Projects.context";
import { FormattedProject } from "@/models/project";
import Image from "next/image";
import { useState } from "react";
import { Card } from "./components/Card";

export const ProjectsPageGrid = () => {
  const { projects } = useProjects();
  const [currentProject, setCurrentProject] = useState<FormattedProject | null>(
    null
  );

  const handleHover = (project: FormattedProject) => {
    setCurrentProject(project);
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
          {projects.map((project) => (
            <div
              key={project.id}
              className={`absolute inset-0 w-full h-full opacity-0 transition-all duration-1000 ${
                currentProject?.id === project.id ? "opacity-100" : ""
              }`}
            >
              <Image
                src={project.featured_image}
                width={1920}
                height={1080}
                alt={project.title.rendered}
                className="h-full w-full object-cover blur-[20px]"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col lg:gap-40">
          {projects.map((project) => (
            <div
              key={project.id}
              className="h-screen w-full flex items-center justify-center"
            >
              <Card
                onMouseEnter={() => handleHover(project)}
                onMouseLeave={handleNoHover}
                featured_image={project.featured_image}
                featured_image_mobile={project.featured_image_mobile}
                featured_video={project.featured_video}
                title={project.title.rendered}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
