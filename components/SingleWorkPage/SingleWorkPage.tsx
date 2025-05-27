"use client";

import { WorkShowcase } from "./WorkShowcase/WorkShowcase";
import useWorkStore, { UseWorkStoreType } from "@/store/useWorkStore";

interface Props {
  slug: string;
}

export const SingleWorkPageTemplate = ({ slug }: Props) => {
  const { works } = useWorkStore() as UseWorkStoreType;

  const work = works.find((item) => item.slug === slug);

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-whiteCustom">
      {work ? (
        <WorkShowcase work={work} />
      ) : (
        <div>This work does not exist</div>
      )}
    </div>
  );
};
