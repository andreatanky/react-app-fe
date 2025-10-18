import { useNavigate } from "@tanstack/react-router";

import { Page } from "../../components/layouts/Page";
import CompactSearchBar from "./components/CompactSearchBar";

export const SearchPage = () => {
	const navigate = useNavigate();

	const handleBackClick = () => {
		navigate({ to: "/" });
	};

	return (
		<Page>
			<CompactSearchBar
				onExitSearch={handleBackClick}
				onSearchSubmit={() => {}}
			/>
		</Page>
	);
};
