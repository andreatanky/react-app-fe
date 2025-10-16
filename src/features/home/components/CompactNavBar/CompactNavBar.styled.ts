import Button from "@mui/material/Button";
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
	boxShadow: theme.shadows[6],
	transform: visible ? "translateY(0)" : "translateY(-110%)",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shorter,
	}),
	zIndex: theme.zIndex.appBar,
}));

export const Content = styled("div")(({ theme }) => ({
	maxWidth: 1200,
	margin: "0 auto",
	padding: theme.spacing(2, 3),
	display: "flex",
	flexDirection: "column",
	gap: theme.spacing(2),
}));

export const TopRow = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	gap: theme.spacing(3),
	[theme.breakpoints.down("md")]: {
		flexDirection: "column",
		alignItems: "flex-start",
		gap: theme.spacing(1.5),
	},
}));

export const Logo = styled("img")(() => ({
	display: "block",
	maxWidth: 150,
	width: "100%",
	height: "auto",
}));

export const Actions = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(4),
	[theme.breakpoints.down("md")]: {
		gap: theme.spacing(2),
	},
}));

export const ActionButton = styled(Button)(({ theme }) => ({
	textTransform: "none",
	padding: theme.spacing(0.75, 2.25),
	borderRadius: theme.shape.borderRadius,
	color: theme.palette.surface.on,
	"&:hover": {
		backgroundColor: theme.palette.surface.outline,
	},
}));

export const FullWidthDivider = styled("hr")(({ theme }) => ({
	border: 0,
	borderTop: `1px solid ${theme.palette.divider}`,
	margin: 0,
	width: "100vw",
	marginLeft: "calc(50% - 50vw)",
	marginRight: "calc(50% - 50vw)",
}));

export const BottomRow = styled("div")(() => ({
	display: "grid",
}));
