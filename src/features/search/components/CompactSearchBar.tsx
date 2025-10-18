import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from "@mui/material/IconButton";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { type FormEvent, forwardRef } from "react";

import { HomeFilterBar } from "../../../components/search/HomeFilterbar";
import { HomeSearchInput } from "../../../components/search/HomeSearchInput";
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

	return (
		<Container data-compact-search-bar ref={ref}>
			<Content>
				<TopRow>
					<IconButton aria-label="Cancel search" onClick={onExitSearch}>
						<ArrowBackIcon />
					</IconButton>
				</TopRow>
				<SearchRow>
					<HomeSearchInput
						onSubmit={onSearchSubmit}
						backgroundColor={muiTheme.palette.surface.on}
					/>
				</SearchRow>
				<BottomRow>
					<HomeFilterBar />
				</BottomRow>
			</Content>
			<FullWidthDivider />
		</Container>
	);
});

CompactSearchBar.displayName = "CompactSearchBar";

export default CompactSearchBar;
