import { useResources } from "@/contexts/Resources.context";
import { Card } from "./components/Card";
import { Button } from "../ui/button";
import { useState } from "react";

const categories = [
  {
    id: 1,
    name: "Scroll",
  },
  {
    id: 4,
    name: "Mouse",
  },
  {
    id: 5,
    name: "Mask",
  },
  {
    id: 6,
    name: "3D",
  },
  {
    id: 7,
    name: "Menu",
  },
  {
    id: 8,
    name: "Transition",
  },
];

export const Resources = () => {
  const resources = useResources();
  const [filteredResources, setFilteredResources] = useState(resources);
  const [allVisible, setAllVisible] = useState(false);

  const handleCategories = (id: number) => {
    setFilteredResources(
      id === 0
        ? resources
        : resources.filter((resource) =>
            resource.categories.some((cat) => cat.id === id)
          )
    );
  };

  const toggleSeeAll = () => {
    setAllVisible((prev) => !prev);
  };

  return (
    <section id="resources" className="pb-[200px]">
      <div className="grid-18 _1row max-w-[1600px] mx-auto p-3 bg-[#1a1a1a] border-gray border-[1px] rounded-2xl">
        <div className="col-start-1 col-end-5 bg-black p-8 rounded-2xl">
          <div className="h-full">
            {categories.map((item) => (
              <div key={item.id} className="w-full">
                <Button
                  onClick={() => handleCategories(item.id)}
                  className="w-full pl-4 py-4 text-[1.5rem] h-fit flex justify-start bg-transparent"
                >
                  {item.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="col-start-5 col-end-[19] flex flex-col gap-8">
          <div className="grid md:grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(3,1fr)] w-full md:gap-4 sm:gap-5 gap-4">
            {(allVisible
              ? filteredResources
              : filteredResources.slice(0, 6)
            ).map((resource) => (
              <Card
                slug={resource.slug}
                key={resource.id}
                title={resource.title.rendered}
                short_description={resource.meta.short_description}
                featured_image={resource.meta.featured_image}
                featured_video={resource.meta.featured_video}
                categories={resource.categories}
              />
            ))}
          </div>
          {filteredResources.length > 6 && (
            <div className="w-full flex justify-center items-center">
              <Button
                onClick={toggleSeeAll}
                className="bg-blue-500 hover:bg-blue-700"
              >
                {allVisible ? "See Less" : "See All"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
