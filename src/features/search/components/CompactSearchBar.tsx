import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { type FormEvent, forwardRef } from "react";

import { ActionButtonWithTextAndIcon } from "../../../components/buttons/ActionButtonWithTextAndIcon";
import { FilterBar } from "../../../components/search/Filterbar";
import { Searchbar } from "../../../components/search/Searchbar";
import { useSearchFilters } from "../../../features/search/hooks/useSearchFilters";
import { useSearch } from "../../../features/search/hooks/useSearch";
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
	const { query, setQuery } = useSearch();
	const { items, selectedFilters, handleToggle, clearFilters } =
		useSearchFilters();

	return (
		<Container ref={ref}>
			<Content>
				<TopRow>
					<ActionButtonWithTextAndIcon
						type="button"
						color="inherit"
						icon={<ArrowBackIcon />}
						label="Back"
						onClick={onExitSearch}
					/>
				</TopRow>
			<SearchRow>
				<Searchbar
					onSubmit={onSearchSubmit}
					query={query}
					onQueryChange={setQuery}
					backgroundColor={muiTheme.palette.surface.on}
					autoFocus
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
