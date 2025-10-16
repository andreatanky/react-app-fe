import { FormEvent, forwardRef } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme as useMuiTheme } from "@mui/material/styles";

import { HomeFilterBar } from "../HomeFilterBar";
import { HomeSearchInput } from "../HomeSearchInput";
import {
	Container,
	Content,
	TopRow,
	SearchRow,
	BottomRow,
	FullWidthDivider,
} from "./CompactSearchBar.styled";

type CompactSearchBarProps = {
	visible: boolean;
	onSearchSubmit: (event: FormEvent) => void;
	onExitSearch: () => void;
};

export const CompactSearchBar = forwardRef<
	HTMLDivElement,
	CompactSearchBarProps
>(({ visible, onSearchSubmit, onExitSearch }, ref) => {
	const muiTheme = useMuiTheme();

	return (
		<Container data-compact-search-bar ref={ref} visible={visible}>
			<Content>
				<TopRow>
					<IconButton aria-label="Cancel search" onClick={onExitSearch}>
						<CloseIcon />
					</IconButton>
				</TopRow>
				<FullWidthDivider />
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
		</Container>
	);
});

CompactSearchBar.displayName = "CompactSearchBar";

export default CompactSearchBar;
