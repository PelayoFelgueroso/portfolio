"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search, X } from "lucide-react";
import { useState } from "react";
import { SearchForm } from "./components/SearchForm";
import { Resource } from "@/models/resource";
import useResourceStore, { useResourceType } from "@/store/useResourceStore";

interface Props {
  inViewResources: boolean;
  onFilterChange: (resources: Resource[]) => void;
}

export const FilterWrapper = ({ inViewResources, onFilterChange }: Props) => {
  const { resources, categories } = useResourceStore() as useResourceType;

  const [isOpen, setIsOpen] = useState<"cat" | "search" | null>(null);

  const handleOpen = (item: "cat" | "search" | null) => {
    setIsOpen(item);
  };

  const handleClose = () => {
    setIsOpen(null);
  };

  const filterByCategory = (catId: string) => {
    const filtered = resources.filter((resource) =>
      resource.categoryIds.includes(catId)
    );
    onFilterChange(filtered);
    handleClose();
  };

  const clearCategories = () => {
    onFilterChange(resources);
    handleClose();
  };

  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim().toLowerCase();

    if (!trimmedQuery) {
      onFilterChange(resources);
      return;
    }

    const results = resources.filter((res) => {
      const title = res.title.toLowerCase();
      const desc = res.data.description?.toLowerCase() || "";
      const shortDesc = res.data?.short_description?.toLowerCase() || "";

      return (
        title.includes(trimmedQuery) ||
        desc.includes(trimmedQuery) ||
        shortDesc.includes(trimmedQuery)
      );
    });

    onFilterChange(results);
  };

  return (
    <div className="fixed w-full inset-[auto_0%_2rem]">
      <div className="w-full">
        <div className="relative flex justify-center items-center">
          <AnimatePresence mode="wait">
            {inViewResources && (
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: "transform, opacity" }}
                className="relative max-w-[300px] xs:max-w-[80%] 2md:max-w-[900px] p-2.5 rounded-xl text-whiteCustom bg-blackCustom cursor-light"
              >
                <AnimatePresence mode="wait">
                  {isOpen && (
                    <motion.div
                      initial={{ width: "0px", height: "0px" }}
                      animate={{
                        width: "auto",
                        height: "auto",
                        transition: { duration: 0.3 },
                      }}
                      exit={{
                        width: "0px",
                        height: "0px",
                        transition: { duration: 0.3, delay: 0.3 },
                      }}
                      style={{ willChange: "width, height" }}
                      className="bg-clip-border"
                    >
                      {isOpen === "cat" && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                            transition: { duration: 0.3, delay: 0.3 },
                          }}
                          exit={{
                            opacity: 0,
                            transition: { duration: 0.3, delay: 0 },
                          }}
                          style={{ willChange: "opacity" }}
                          className="p-4 md:p-12"
                        >
                          <div className="h-16">
                            <h3 className="text300 mt-5 mb-2.5 text-whiteCustom uppercase">
                              Categories
                            </h3>
                          </div>

                          <div className="2md:min-h-[175px]">
                            <ul className="flex flex-wrap">
                              <li className="max-w-1/3">
                                <button
                                  onClick={clearCategories}
                                  className="min-w-[260px] w-full max-w-full inline-block text-left pr-[60px] py-[14px] transition-[padding] duration-200 text200 text-whiteCustom hover:pl-2"
                                >
                                  Recent
                                </button>
                              </li>
                              {categories.map((cat) => (
                                <li key={cat.id} className="max-w-1/3">
                                  <button
                                    onClick={() => filterByCategory(cat.id)}
                                    className="cursor-pointer min-w-[260px] w-full max-w-full inline-block text-left pr-[60px] py-[14px] transition-[padding] duration-200 text200 text-whiteCustom hover:pl-2"
                                  >
                                    {cat.name}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}

                      {isOpen === "search" && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                            transition: { duration: 0.3, delay: 0.2 },
                          }}
                          exit={{
                            opacity: 0,
                            transition: { duration: 0.3, delay: 0 },
                          }}
                          style={{ willChange: "opacity" }}
                          className="p-4 md:p-12"
                        >
                          <div className="h-16">
                            <h3 className="text300 mt-5 mb-2.5 text-whiteCustom uppercase">
                              Search
                            </h3>
                          </div>

                          <SearchForm onSearchChange={handleSearch} />
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-center items-center bg-clip-border">
                  <div className="flex gap-2.5">
                    <button
                      onClick={
                        isOpen === "cat" ? handleClose : () => handleOpen("cat")
                      }
                      className="cursor-pointer max-w-full h-[60px] flex justify-center items-center px-12 rounded-[10px] bg-darkGrayCustom bg-clip-border"
                    >
                      <div className="text100 text-whiteCustom uppercase">
                        Categories
                      </div>
                      <motion.div
                        initial={{ rotate: "0deg" }}
                        animate={isOpen === "cat" ? { rotate: "-180deg" } : {}}
                        transition={{ duration: 0.2 }}
                        style={{
                          willChange: "transform",
                        }}
                        className="flex justify-center items-center ml-1 mt-1"
                      >
                        <ChevronDown className="w-5" />
                      </motion.div>
                    </button>

                    <button
                      onClick={
                        isOpen === "search"
                          ? handleClose
                          : () => handleOpen("search")
                      }
                      className="cursor-pointer max-w-full h-[60px] flex justify-center items-center rounded-[10px] bg-darkGrayCustom overflow-hidden"
                    >
                      <Search className="w-[30px] h-[30px] mx-[15px]" />
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.3, delay: 0.2 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.3, delay: 0 },
                    }}
                    onClick={handleClose}
                    className="cursor-pointer absolute inset-[0%_0%_auto_auto] w-[90px] h-[90px] max-w-full flex justify-center items-center"
                  >
                    <X className="w-[30px] h-[30px] fill-whiteCustom" />
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
