"use client";

import { AnimatePresence } from "framer-motion";
import { ResourcesSidebar } from "./components/ResourceArticle/components/ResourcesSidebar/ResourcesSidebar";
import { ResourceArticle } from "./components/ResourceArticle/ResourceArticle";
import { useResources } from "@/contexts/Resources.context";

interface Props {
  slug: string;
}

export const ResourcesArticlePage = ({ slug }: Props) => {
  const { resources, loadingResources, categories, loadingCategories } =
    useResources();

    console.log(resources)

  const resource = resources.find((resource) => resource.slug === slug);

  if (!resource) {
    return <p>Recurso no encontrado</p>;
  }

  return (
    <div className="relative w-full max-w-[1575px] px-5 flex justify-center min-[1175px]:justify-start gap-[30px] min-[1400px]:gap-[50px] font-outfit">
      <AnimatePresence mode="wait">
        {!loadingCategories && !loadingResources && (
          <ResourcesSidebar resources={resources} categories={categories} />
        )}
      </AnimatePresence>

      <ResourceArticle resource={resource} />
    </div>
  );
};
