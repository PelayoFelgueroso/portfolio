import { FormattedCategory } from "@/models/Category";
import { Resource } from "@/models/resource";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface useResourceType {
  resources: Resource[];
  categories: FormattedCategory[];
  fetchResources: () => void;
  loading: boolean;
}

const useResourceStore = create(
  persist(
    (set) => ({
      resources: [],
      categories: [],
      loading: false,
      error: null,
      fetchResources: async () => {
        set({ loading: true });
        try {
          const resResources = await fetch("/api/admin/resources/posts", {
            cache: "force-cache",
            next: { revalidate: 3600 },
          });
          const dataResources = await resResources.json();

          const resCategories = await fetch("/api/admin/resources/categories", {
            cache: "force-cache",
            next: { revalidate: 3600 },
          });
          const dataCategories = await resCategories.json();

          set({
            resources: dataResources,
            categories: dataCategories,
            loading: false,
          });
        } catch (error) {
          set({ error, loading: false });
        }
      },
    }),
    {
      name: "resource-store",
    }
  )
);

export default useResourceStore;
