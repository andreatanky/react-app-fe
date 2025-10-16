import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type HomeSearchState = {
	query: string;
	selectedFilters: string[];
	isSearchMode: boolean;
};

type HomeSearchActions = {
	setQuery: (value: string) => void;
	toggleFilter: (key: string) => void;
	clearFilters: () => void;
	enterSearchMode: () => void;
	exitSearchMode: () => void;
};

export const useHomeSearchStore = create<HomeSearchState & HomeSearchActions>()(
	persist(
		(set) => ({
			query: "",
			selectedFilters: [],
			isSearchMode: false,
			setQuery: (value) => set({ query: value }),
			toggleFilter: (key) =>
				set((s) => ({
					selectedFilters: s.selectedFilters.includes(key)
						? s.selectedFilters.filter((v) => v !== key)
						: [...s.selectedFilters, key],
				})),
			clearFilters: () => set({ selectedFilters: [] }),
			enterSearchMode: () => set({ isSearchMode: true }),
			exitSearchMode: () =>
				set({ isSearchMode: false, query: "", selectedFilters: [] }),
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
				isSearchMode: s.isSearchMode,
			}),
		},
	),
);
