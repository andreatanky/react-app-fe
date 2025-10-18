import { useTheme as useMuiTheme } from "@mui/material/styles";
import { type FormEvent, forwardRef } from "react";

import { FilterPill } from "../../../components/buttons/FilterPill";
import { FilterBar } from "../../../components/search/Filterbar";
import { Searchbar } from "../../../components/search/Searchbar";
import { useHomeFilters } from "../../home/hooks/useHomeFilters";
import { useHomeSearch } from "../../home/hooks/useHomeSearch";
import {
	BottomRow,
	Container,
	Content,
	FullWidthDivider,
	SearchRow,
	TopRow,
} from "./CompactSearchBar.styled";

type CompactSearchBarProps = {
	onSearchSubmit: (event: FormEvent) => void;
	onExitSearch: () => void;
};

export const CompactSearchBar = forwardRef<
	HTMLDivElement,
	CompactSearchBarProps
>(({ onSearchSubmit, onExitSearch }, ref) => {
	const muiTheme = useMuiTheme();
	const { query, setQuery } = useHomeSearch();
	const { items, selectedFilters, handleToggle, clearFilters } =
		useHomeFilters();

	return (
		<Container data-compact-search-bar ref={ref}>
			<Content>
				<TopRow>
					<FilterPill
						label="Back"
						onToggle={onExitSearch}
						roundLeft
						roundRight
					/>
				</TopRow>
				<SearchRow>
					<Searchbar
						onSubmit={onSearchSubmit}
						query={query}
						onQueryChange={setQuery}
						backgroundColor={muiTheme.palette.surface.on}
					/>
				</SearchRow>
				<BottomRow>
					<FilterBar
						items={items}
						selectedKeys={selectedFilters}
						onToggle={handleToggle}
						onClear={clearFilters}
					/>
				</BottomRow>
			</Content>
			<FullWidthDivider />
		</Container>
	);
});

CompactSearchBar.displayName = "CompactSearchBar";

export default CompactSearchBar;
