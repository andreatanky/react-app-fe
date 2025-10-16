import { FilterBar } from "./FilterBar/FilterBar";
import { useHomeSearch } from "../hooks/useHomeSearch";
import { HOME_FILTERS } from "../constants";

type HomeFilterBarProps = {
	className?: string;
	showClear?: boolean;
};

export const HomeFilterBar = ({
	className,
	showClear = true,
}: HomeFilterBarProps) => {
	const { selectedFilters, toggleFilter, clearFilters } = useHomeSearch();

	const handleToggle = (key: string) => {
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
	};

	return (
		<FilterBar
			items={HOME_FILTERS}
			selectedKeys={selectedFilters}
			onToggle={handleToggle}
			onClear={showClear ? clearFilters : undefined}
			className={className}
		/>
	);
};
