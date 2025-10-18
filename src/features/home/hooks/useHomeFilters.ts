import { useCallback } from "react";

import { HOME_FILTERS } from "../constants";
import { useHomeSearch } from "./useHomeSearch";

export const useHomeFilters = () => {
	const { selectedFilters, toggleFilter, clearFilters } = useHomeSearch();

	const handleToggle = useCallback(
		(key: string) => {
			const target = HOME_FILTERS.find((item) => item.key === key);
			if (!target) {
				return;
			}

			const isSelected = selectedFilters.includes(key);

			if (target.segment && !isSelected) {
				HOME_FILTERS.filter((item) => item.segment === target.segment)
					.map((item) => item.key)
					.forEach((segmentKey) => {
						if (segmentKey !== key && selectedFilters.includes(segmentKey)) {
							toggleFilter(segmentKey);
						}
					});
			}

			toggleFilter(key);
		},
		[selectedFilters, toggleFilter],
	);

	return {
		items: HOME_FILTERS,
		selectedFilters,
		handleToggle,
		clearFilters,
	};
};
