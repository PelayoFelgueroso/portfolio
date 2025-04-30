"use client";

import React from "react";
import { WorksShowcase } from "./WorksShowcase/WorksShowcase";
import { useProjects } from "@/contexts/Projects.context";

export const WorksPageTemplate = () => {
  const { projects } = useProjects();

  return (
    <div className="pt-[69px]  pb-[clamp(40px,_24vw,_120px)] bg-whiteCustom">
      <WorksShowcase works={projects} />
    </div>
  );
};

