"use client";

import React from "react";
import { WorksShowcase } from "./WorksShowcase/WorksShowcase";
import { useProjects } from "@/contexts/Projects.context";

export const WorksPage = () => {
  const { projects } = useProjects();

  return (
    <div className="pt-[100px]  pb-[clamp(40px,_24vw,_120px)] bg-whiteCustom">
      <WorksShowcase works={projects} />
    </div>
  );
};

