import useResourceStore, { useResourceType } from "@/store/useResourceStore";
import { ResourcesSidebarDropDown } from "./components/ResourcesSidebarDropDown";

export const ResourcesSidebar = () => {
  const { categories } = useResourceStore() as useResourceType;

  return (
    <aside className="hidden xl:block h-full min-h-screen sticky left-0 top-[25px] z-[5]">
      <div className="mt-[80px] w-[290px] h-[calc(100vh_-_190px)] overflow-y-auto flex flex-col gap-5">
        {categories.map((category) => {
          return (
            <ResourcesSidebarDropDown
              key={category.id}
              title={category.name}
              resources={category.posts}
            />
          );
        })}
      </div>
    </aside>
  );
};
