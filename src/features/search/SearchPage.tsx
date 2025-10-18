import { useNavigate } from "@tanstack/react-router";

import { Page } from "../../components/layouts/Page";
import CompactSearchBar from "./components/CompactSearchBar";
import { useSearch } from "./hooks/useSearch";
import { FormEvent, useCallback } from "react";
import { useSearchFilters } from "./hooks/useSearchFilters";

export const SearchPage = () => {
	const navigate = useNavigate();

	const { query, setQuery } = useSearch();
		
	const {
		items: filterItems,
		selectedFilters,
		handleToggle,
		clearFilters,
	} = useSearchFilters();

	const submitSearch = useCallback(
			(_event: FormEvent) => {
				console.log("search submit:", query, selectedFilters);
			},
			[query, selectedFilters],
		);

	const handleBackClick = () => {
		setQuery("")
		navigate({ to: "/" });
	};

	return (
		<Page>
			<CompactSearchBar
				onExitSearch={handleBackClick}
				onSearchSubmit={submitSearch}
			/>
		</Page>
	);
};
