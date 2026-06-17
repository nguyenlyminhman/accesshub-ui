import { create } from "zustand";

// Define the types for the store state
interface LoadingStore {
  loading: boolean;
  loadingCount: number;
  setLoading: (loading: boolean) => void;
  setLoadingCount: (update: (currentCount: number) => number) => void;
}

// Create the Zustand store with proper typings
export const useLoadingStore = create<LoadingStore>((set) => ({
  loading: false,
  loadingCount: 0,
  setLoading: (loading: boolean) => set({ loading }),
  setLoadingCount: (update: (currentCount: number) => number) =>
    set((state) => ({
      loadingCount: update(state.loadingCount),
    })),
}));