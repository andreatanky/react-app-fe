import { useCallback } from "react";

import type { FilterItem } from "../../../components/search/Filterbar";

import { DEFAULT_SEARCH_FILTERS } from "../config/filters";
import { computeNextFilters } from "../utils/filterSelection";
import { useSearch } from "./useSearch";

export const useSearchFilters = (
	filters: FilterItem[] = DEFAULT_SEARCH_FILTERS,
) => {
	const { selectedFilters, setSelectedFilters, clearFilters } = useSearch();

	const handleToggle = useCallback(
		(key: string) => {
			const next = computeNextFilters(selectedFilters, filters, key);

			if (next.length === selectedFilters.length) {
				const unchanged =
					next.every((value) => selectedFilters.includes(value)) &&
					selectedFilters.every((value) => next.includes(value));

				if (unchanged) {
					return;
				}
			}

			setSelectedFilters(next);
		},
		[selectedFilters, filters, setSelectedFilters],
	);

	return {
		items: filters,
		selectedFilters,
		handleToggle,
		clearFilters,
	};
};
