"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./components/Card";
import { FormattedResource } from "@/models/resource";
import { Category } from "@/services/categories.service";
import Image from "next/image";

interface Props {
  resources: FormattedResource[];
  categories: Category[];
}

export const ResourcesGrid = ({ resources, categories }: Props) => {
  const [filteredResources, setFilteredResources] = useState(resources);
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCategories = (id: number) => {
    setFilteredResources(
      id === 0
        ? resources
        : resources.filter((resource) =>
            resource.categories.some((cat) => cat === id)
          )
    );
    setActive(id);
  };

  if (!mounted) return null;

  return (
    <div className="relative max-w-[1800px] mx-auto w-full px-4 md:px-8 pb-[100px] md:pb-[200px]">
      <div className="md:grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[280px_1fr] gap-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="col-start-2"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">UI Resources</h1>
          <p className="text-gray-600 mb-6">
            A collection of UI components I&apos;ve created throughout my career
          </p>
        </motion.div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[280px_1fr] gap-8">
        <aside className="z-[100] h-fit sticky top-[100px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/50 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-gray-100"
          >
            <h2 className="text-xl font-bold mb-4 px-2">Categories</h2>
            <div
              style={{ scrollbarWidth: "none" }}
              className="flex overflow-x-scroll sm:overflow-x-visible scrollbar-none sm:flex-col xs:gap-2"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="w-full"
              >
                <Button
                  onClick={() => handleCategories(0)}
                  className={`w-fit sm:w-full pl-4 py-3 text-[1.1rem] h-fit flex justify-start gap-4 bg-transparent shadow-none hover:bg-white/80 hover:text-black transition-all duration-300 rounded-xl ${
                    active === 0
                      ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                      : "text-gray-700"
                  }`}
                >
                  <Clock className="h-5 w-5" />
                  <div className="hidden md:block">Recent</div>
                </Button>
              </motion.div>

              {categories.map((item) => {
                return (
                  <motion.div
                    key={item.id}
                    className="w-full"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Button
                      onClick={() => handleCategories(item.id)}
                      className={`w-fit sm:w-full pl-4 py-3 text-[1.1rem] h-fit flex justify-start gap-4 bg-transparent shadow-none hover:bg-grayCustom hover:text-blackCustom transition-all duration-300 rounded-xl ${
                        item.id === active
                          ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                          : "text-gray-700"
                      }`}
                    >
                      <Image
                        src={item.acf.icon.value}
                        width={20}
                        height={20}
                        alt=""
                        className=""
                      />
                      <div className="hidden md:block">{item.name}</div>
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </aside>

        <div className="relative flex flex-col gap-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] w-full gap-6"
            >
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.1 },
                  }}
                >
                  <Card
                    slug={resource.slug}
                    title={resource.title.rendered}
                    short_description={resource.acf.short_description}
                    featured_image={resource.featured_image}
                    featured_video={resource.featured_video}
                    categories={resource.category_name}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredResources.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <h3 className="text-xl font-medium text-gray-700">
                No resources found
              </h3>
              <p className="text-gray-500 mt-2">
                Try selecting a different category
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
