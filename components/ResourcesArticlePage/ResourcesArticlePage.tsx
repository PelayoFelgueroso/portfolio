"use client";

import { AnimatePresence } from "framer-motion";
import { ResourcesSidebar } from "./components/ResourceArticle/components/ResourcesSidebar/ResourcesSidebar";
import { ResourceArticle } from "./components/ResourceArticle/ResourceArticle";
import useResourceStore, { useResourceType } from "@/store/useResourceStore";

interface Props {
  slug: string;
}

export const ResourcesArticlePage = ({ slug }: Props) => {
  const { resources } = useResourceStore() as useResourceType;

  const resource = resources.find((resource) => resource.slug === slug);

  if (!resource) {
    return <p>Recurso no encontrado</p>;
  }

  return (
    <div className="relative w-full px-[clamp(16px,_1.4vw,_24px)] flex justify-center gap-[30px] min-[1400px]:gap-[50px] font-outfit">
      <AnimatePresence mode="wait">
        {resources && (
          <div className="absolute left-0 pl-[clamp(16px,_1.4vw,_24px)]">
            <ResourcesSidebar />
          </div>
        )}
      </AnimatePresence>

      <ResourceArticle resource={resource} />
    </div>
  );
};
