import { FormattedCategory } from "@/models/Category";
import { Resource } from "@/models/resource";
import { create } from "zustand";

export interface useResourceType {
  resources: Resource[];
  categories: FormattedCategory[];
  fetchResources: () => Promise<void>;
  loading: boolean;
  error: Error | null;
}

const useResourceStore = create<useResourceType>((set) => ({
  resources: [],
  categories: [],
  loading: true,
  error: null,
  fetchResources: async () => {
    set({ loading: true, error: null });
    try {
      const resResources = await fetch(
        "/api/admin/resources/posts"
      );

      if (!resResources.ok) {
        throw new Error(`Failed to fetch resources: ${resResources.status}`);
      }

      const dataResources = await resResources.json();
      console.log("Resources fetched:", dataResources);

      const resCategories = await fetch(
        "/api/admin/resources/categories"
      );

      if (!resCategories.ok) {
        throw new Error(`Failed to fetch categories: ${resCategories.status}`);
      }

      const dataCategories = await resCategories.json();
      console.log("Categories fetched:", dataCategories);

      set({
        resources: dataResources,
        categories: dataCategories,
        loading: false,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Error fetching resources:", errorMessage);
      set({ error: error as Error, loading: false });
    }
  },
}));

export default useResourceStore;
