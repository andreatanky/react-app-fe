import { useShallow } from "zustand/react/shallow";
import { useHomeSearchStore } from "../store/useHomeSearchStore";

export const useHomeSearch = () => {
	return useHomeSearchStore(
		useShallow((state) => ({
			query: state.query,
			selectedFilters: state.selectedFilters,
			setQuery: state.setQuery,
			toggleFilter: state.toggleFilter,
			clearFilters: state.clearFilters,
		})),
	);
};
