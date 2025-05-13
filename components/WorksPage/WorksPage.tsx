"use client";

import React from "react";
import { WorksShowcase } from "./WorksShowcase/WorksShowcase";
import useWorkStore, { UseWorkStoreType } from "@/store/useWorkStore";

export const WorksPageTemplate = () => {
  const { works } = useWorkStore() as UseWorkStoreType;

  return (
    <div className="pt-[69px]  pb-[clamp(40px,_24vw,_120px)] bg-whiteCustom">
      <WorksShowcase works={works} />
    </div>
  );
};
