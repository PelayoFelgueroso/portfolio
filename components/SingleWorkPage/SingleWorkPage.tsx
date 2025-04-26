"use client";

import { useProjects } from "@/contexts/Projects.context";
import { WorkShowcase } from "./WorkShowcase/WorkShowcase";
import { useEffect } from "react";

interface Props {
  slug: string;
}

export const SingleWorkPageTemplate = ({ slug }: Props) => {
  const { projects } = useProjects();

  const work = projects.find((item) => item.slug === slug);

  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const nextWork = projects[(currentIndex + 1) % projects.length];

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (footer) {
      footer.classList.add("hidden");
    }

    return () => {
      if (footer) {
        footer.classList.remove("hidden");
      }
    };
  }, []);

  return (
    <div className="h-screen pt-[100px] bg-whiteCustom">
      {work ? (
        <WorkShowcase work={work} nextWork={nextWork} />
      ) : (
        <div>This work does not exist</div>
      )}
    </div>
  );
};
