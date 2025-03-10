"use client"

import { useResources } from "@/contexts/Resources.context"
import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Clock } from "lucide-react"
import { categories } from "@/apis/categories"
import { motion, AnimatePresence } from "framer-motion"
import { PageCard } from "./components/PageCard"

export const ResourcesGrid = () => {
  const resources = useResources()
  const [filteredResources, setFilteredResources] = useState(resources)
  const [active, setActive] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCategories = (id: number) => {
    setFilteredResources(
      id === 0 ? resources : resources.filter((resource) => resource.categories.some((cat) => cat.id === id)),
    )
    setActive(id)
  }

  if (!mounted) return null

  return (
    <div className="relative max-w-[1800px] mx-auto w-full px-4 md:px-8 pb-[100px] md:pb-[200px]">
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[280px_1fr] gap-8">
        <aside className="h-fit sticky top-[100px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/50 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-gray-100"
          >
            <h2 className="text-xl font-bold mb-4 px-2">Categories</h2>
            <div
              style={{ scrollbarWidth: "none" }}
              className="flex overflow-x-scroll scrollbar-none xs:flex-col xs:gap-2"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="w-full"
              >
                <Button
                  onClick={() => handleCategories(0)}
                  className={`w-full pl-4 py-3 text-[1.1rem] h-fit flex justify-start gap-4 bg-transparent shadow-none hover:bg-white/80 hover:text-black transition-all duration-300 rounded-xl ${
                    active === 0 ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white" : "text-gray-700"
                  }`}
                >
                  <Clock className="h-5 w-5" />
                  <div className="hidden md:block">Recent</div>
                </Button>
              </motion.div>

              {categories.map((item) => {
                const IconComponent = item.icon

                return (
                  <motion.div
                    key={item.id}
                    className="w-full"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Button
                      onClick={() => handleCategories(item.id)}
                      className={`w-full pl-4 py-3 text-[1.1rem] h-fit flex justify-start gap-4 bg-transparent shadow-none hover:bg-white/80 hover:text-black transition-all duration-300 rounded-xl ${
                        item.id === active
                          ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                          : "text-gray-700"
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                      <div className="hidden md:block">{item.name}</div>
                    </Button>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </aside>

        <div className="flex flex-col gap-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">UI Resources</h1>
            <p className="text-gray-600 mb-6">A collection of UI components I&apos;ve created throughout my career</p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6"
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
                  <PageCard
                    slug={resource.slug}
                    title={resource.title.rendered}
                    short_description={resource.meta.short_description}
                    featured_image={resource.meta.featured_image}
                    featured_video={resource.meta.featured_video}
                    categories={resource.categories}
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
              <h3 className="text-xl font-medium text-gray-700">No resources found</h3>
              <p className="text-gray-500 mt-2">Try selecting a different category</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

