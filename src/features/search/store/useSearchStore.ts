import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SearchState = {
	query: string;
	selectedFilters: string[];
};

type SearchActions = {
	setQuery: (value: string) => void;
	setSelectedFilters: (filters: string[]) => void;
	clearFilters: () => void;
};

export type SearchStore = SearchState & SearchActions;

export const useSearchStore = create<SearchStore>()(
	persist(
		(set) => ({
			query: "",
			selectedFilters: [],
			setQuery: (value) => set({ query: value }),
			setSelectedFilters: (filters) => set({ selectedFilters: filters }),
			clearFilters: () => set({ selectedFilters: [] }),
		}),
		{
			name: "search-state",
			storage:
				typeof window === "undefined"
					? undefined
					: createJSONStorage(() => sessionStorage),
			partialize: (state) => ({
				query: state.query,
				selectedFilters: state.selectedFilters,
			}),
		},
	),
);
