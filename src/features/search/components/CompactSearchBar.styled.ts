import styled from "@emotion/styled";

export const Container = styled("div")(({ theme }) => ({
	position: "fixed",
	top: 0,
	left: 0,
	right: 0,
	width: "100%",
	backgroundColor: theme.palette.surface.container
}));

export const Content = styled("div")(({ theme }) => ({
	maxWidth: 1200,
	margin: "0 auto",
	padding: theme.spacing(2, 3),
	display: "flex",
	flexDirection: "column",
	gap: theme.spacing(2),
	[theme.breakpoints.down("md")]: {
		gap: theme.spacing(1.5),
	},
}));

export const TopRow = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-start",
	gap: theme.spacing(0.5),
	font: "inherit"
}));

export const FullWidthDivider = styled("hr")(({ theme }) => ({
	border: 0,
	borderTop: `1px solid ${theme.palette.divider}`,
	margin: 0,
	width: "100vw",
	marginLeft: "calc(50% - 50vw)",
	marginRight: "calc(50% - 50vw)",
}));

export const SearchRow = styled("div")(() => ({
	display: "flex",
	alignItems: "center",
}));

export const BottomRow = styled("div")(() => ({
	display: "grid",
}));
