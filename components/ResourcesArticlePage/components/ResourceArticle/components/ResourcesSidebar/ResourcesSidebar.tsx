import { FormattedResource } from "@/models/resource";
import { Category } from "@/services/categories.service";
import { ResourcesSidebarDropDown } from "./components/ResourcesSidebarDropDown";

interface Props {
  categories: Category[];
  resources: FormattedResource[];
}

export const ResourcesSidebar = ({ resources, categories }: Props) => {
  return (
    <aside className="hidden xl:block h-full min-h-screen sticky left-0 top-[25px] z-[5]">
      <div className="mt-[80px] w-[290px] h-[calc(100vh_-_190px)] overflow-y-auto flex flex-col gap-5">
        {categories.map((category) => {
          const categorizedResources = resources.filter((resource) =>
            resource.categories.includes(category.id)
          );
          if (categorizedResources.length === 0) {
            return;
          }
          return (
            <ResourcesSidebarDropDown
              key={category.id}
              title={category.name}
              resources={categorizedResources}
            />
          );
        })}
      </div>
    </aside>
  );
};
