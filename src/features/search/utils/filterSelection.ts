import type { FilterItem } from "../../../components/search/Filterbar";

const findFilter = (filters: FilterItem[], key: string) =>
	filters.find((filter) => filter.key === key);

export const computeNextFilters = (
	current: string[],
	filters: FilterItem[],
	key: string,
): string[] => {
	const target = findFilter(filters, key);
	if (!target) {
		return current;
	}

	const isSelected = current.includes(key);
	if (isSelected) {
		return current.filter((value) => value !== key);
	}

	if (!target.segment) {
		return [...current, key];
	}

	const filtered = current.filter((value) => {
		const candidate = findFilter(filters, value);
		if (!candidate) {
			return true;
		}

		return candidate.segment !== target.segment;
	});

	return [...filtered, key];
};
