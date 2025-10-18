import { useTheme as useMuiTheme } from "@mui/material/styles";
import {
	Searchbar,
	type SearchbarProps,
} from "./Searchbar";

import { useHomeSearch } from "../../features/home/hooks/useHomeSearch";

type HomeSearchInputProps = Omit<SearchbarProps, "query" | "onQueryChange"> & {
	backgroundColor?: string;
};

export const HomeSearchInput = ({
	onSubmit,
	backgroundColor,
	...rest
}: HomeSearchInputProps) => {
	const { query, setQuery } = useHomeSearch();
	const muiTheme = useMuiTheme();

	const resolvedBackground = backgroundColor ?? muiTheme.palette.surface.bright;

	return (
		<Searchbar
			{...rest}
			query={query}
			onQueryChange={setQuery}
			onSubmit={onSubmit}
			backgroundColor={resolvedBackground}
		/>
	);
};
