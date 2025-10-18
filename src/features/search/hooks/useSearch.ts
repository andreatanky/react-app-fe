import { useShallow } from "zustand/react/shallow";

import { useSearchStore } from "../store/useSearchStore";

export const useSearch = () => {
	return useSearchStore(
		useShallow((state) => ({
			query: state.query,
			selectedFilters: state.selectedFilters,
			setQuery: state.setQuery,
			setSelectedFilters: state.setSelectedFilters,
			clearFilters: state.clearFilters,
		})),
	);
};
