import { Work } from "@/models/work";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UseWorkStoreType {
  works: Work[];
  fetchWorks: () => void;
  loading: boolean;
}

const useWorkStore = create(
  persist(
    (set) => ({
      works: [],
      loading: false,
      error: null,
      fetchWorks: async () => {
        set({ loading: true });
        try {
          const res = await fetch("/api/admin/works/posts", {
            cache: "force-cache",
            next: { revalidate: 3600 },
          });
          const data = await res.json();
          set({ works: data, loading: false });
        } catch (error) {
          set({ error, loading: false });
        }
      },
    }),
    {
      name: "work-store",
    }
  )
);

export default useWorkStore;
