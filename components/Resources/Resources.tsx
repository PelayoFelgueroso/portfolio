import { useResources } from "@/contexts/Resources.context";
import { Card } from "./components/Card";
import { Button } from "../ui/button";
import { useState } from "react";
import { Clock } from "lucide-react";
import { categories } from "@/apis/categories";

export const Resources = () => {
  const resources = useResources();
  const [filteredResources, setFilteredResources] = useState(resources);
  const [allVisible, setAllVisible] = useState(false);
  const [active, setActive] = useState(0);

  const handleCategories = (id: number) => {
    setFilteredResources(
      id === 0
        ? resources
        : resources.filter((resource) =>
            resource.categories.some((cat) => cat.id === id)
          )
    );
    setActive(id);
  };

  const toggleSeeAll = () => {
    setAllVisible((prev) => !prev);
  };

  return (
    <section id="resources" className="relative pb-[200px] px-4">
      <div
        className={`grid-18 _1row w-full xl:max-w-[1600px] mx-auto p-3 bg-[#f4f4f4] rounded-lg shadow-2xl gap-3 flex-col xs:flex-row %¿${
          allVisible ? "" : "max-h-[75vh]"
        }`}
      >
        <div className="col-start-1 col-end-5 h-fit text-black p-0 rounded-lg">
          <div
            style={{ scrollbarWidth: "none" }}
            className="h-full flex overflow-x-scroll scrollbar-none xs:flex-col xs:gap-2"
          >
            <div className="w-full">
              <Button
                onClick={() => handleCategories(0)}
                className={`w-full pl-4 py-4 text-[1.5rem] h-fit flex justify-start gap-4 bg-transparent text-black shadow-none hover:bg-white hover:text-black ${
                  active === 0
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
              >
                <Clock />
                <div className="hidden md:block">Recent</div>
              </Button>
            </div>
            {categories.map((item) => {
              const IconComponent = item.icon;

              return (
                <div key={item.id} className="w-full">
                  <Button
                    onClick={() => handleCategories(item.id)}
                    className={`w-full pl-4 py-4 text-[1.5rem] h-fit flex justify-start gap-4 bg-transparent text-black shadow-none hover:bg-white hover:text-black ${
                      item.id === active ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    <IconComponent />
                    <div className="hidden md:inline">{item.name}</div>
                  </Button>
                </div>
              );
            })}
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
