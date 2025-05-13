"use client";

import { WorkShowcase } from "./WorkShowcase/WorkShowcase";
import { useEffect } from "react";
import { WorkNav } from "./WorkShowcase/Components/WorkNav";
import useWorkStore, { UseWorkStoreType } from "@/store/useWorkStore";

interface Props {
  slug: string;
}

export const SingleWorkPageTemplate = ({ slug }: Props) => {
  const { works } = useWorkStore() as UseWorkStoreType;

  const work = works.find((item) => item.slug === slug);

  const currentIndex = works.findIndex((item) => item.slug === slug);
  const nextWork = works[(currentIndex + 1) % works.length];
  const prevWork = works[(currentIndex - 1 + works.length) % works.length];

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
    <div className="relative h-screen bg-whiteCustom">
      {work ? (
        <WorkShowcase work={work} nextWork={nextWork} />
      ) : (
        <div>This work does not exist</div>
      )}
      {work && nextWork ? (
        <WorkNav nextWork={nextWork} prevWork={prevWork} />
      ) : (
        <div className="">Go Home</div>
      )}
    </div>
  );
};
