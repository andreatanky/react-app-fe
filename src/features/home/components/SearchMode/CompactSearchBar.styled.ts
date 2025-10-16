import styled from "@emotion/styled";

export const Container = styled("div", {
	shouldForwardProp: (prop) => prop !== "visible",
})<{ visible: boolean }>(({ theme, visible }) => ({
	position: "fixed",
	top: 0,
	left: 0,
	right: 0,
	width: "100%",
	backgroundColor: theme.palette.surface.base,
	boxShadow: theme.shadows[8],
	transform: visible ? "translateY(0)" : "translateY(-100%)",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.enteringScreen,
	}),
	zIndex: theme.zIndex.modal + 1,
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
	justifyContent: "flex-end",
	gap: theme.spacing(1),
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
