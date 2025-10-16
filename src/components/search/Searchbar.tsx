import styled from "@emotion/styled";
import type { FormEvent } from "react";
import searchIcon from "@/assets/icons/search_icon.svg";

export type SearchbarProps = {
	query: string;
	onQueryChange: (newQuery: string) => void;
	onSubmit: (e: FormEvent) => void;
	placeholder?: string;
	backgroundColor?: string;
	onActivate?: () => void;
};

const Form = styled("form", {
	shouldForwardProp: (prop) => prop !== "$backgroundColor",
})<{ $backgroundColor?: string }>(({ theme, $backgroundColor }) => ({
	display: "flex",
	alignItems: "center",
	height: 48,
	borderRadius: 100,
	paddingInline: 8,
	width: "100%",
	backgroundColor: $backgroundColor ?? theme.palette.surface.containerHigh,
	color: theme.palette.surface.onVariant,
}));

const Icon = styled("span")({
	display: "grid",
	placeItems: "center",
});

const Logo = styled("img")({
	width: 36,
	height: 36,
	display: "block",
});

const Input = styled("input")(({ theme }) => ({
	flex: 1,
	minWidth: 0,
	border: 0,
	outline: "none",
	background: "transparent",
	color: "inherit",
	font: "inherit",
	"::placeholder": {
		color: theme.palette.surface.onVariant,
	},
}));

export const Searchbar = ({
	query,
	onQueryChange,
	onSubmit,
	placeholder = "Search all article titles",
	backgroundColor,
	onActivate,
}: SearchbarProps) => {
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onSubmit(e);
	};

	const handleActivate = () => onActivate?.();

	return (
		<Form
			role="search"
			onSubmit={handleSubmit}
			$backgroundColor={backgroundColor}
		>
			<Icon aria-hidden="true">
				<Logo src={searchIcon} alt="Search" />
			</Icon>
			<Input
				value={query}
				onChange={(e) => onQueryChange(e.target.value)}
				onFocus={handleActivate}
				onClick={handleActivate}
				type="search"
				placeholder={placeholder}
				aria-label="Search articles"
			/>
		</Form>
	);
};

export default Searchbar;
