import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type HomeSearchState = {
	query: string;
	selectedFilters: string[];
};

type HomeSearchActions = {
	setQuery: (value: string) => void;
	toggleFilter: (key: string) => void;
	clearFilters: () => void;
};

export const useHomeSearchStore = create<HomeSearchState & HomeSearchActions>()(
	persist(
		(set) => ({
			query: "",
			selectedFilters: [],
			setQuery: (value) => set({ query: value }),
			toggleFilter: (key) =>
				set((s) => ({
					selectedFilters: s.selectedFilters.includes(key)
						? s.selectedFilters.filter((v) => v !== key)
						: [...s.selectedFilters, key],
				})),
			clearFilters: () => set({ selectedFilters: [] }),
		}),
		{
			name: "home-search", // storage key
			storage:
				typeof window === "undefined"
					? undefined
					: createJSONStorage(() => sessionStorage),
			partialize: (s) => ({
				query: s.query,
				selectedFilters: s.selectedFilters,
			}),
		},
	),
);
