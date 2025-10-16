import styled from "@emotion/styled";
import Button from "@mui/material/Button";

export const Container = styled("div")(({ theme }) => ({
	height: theme.spacing(7),
	width: "100%",
	display: "flex",
	alignItems: "center",
}));

export const Spacer = styled("div")(() => ({
	flex: 1,
}));

export const Actions = styled("div")(({ theme }) => ({
	display: "flex",
	gap: theme.spacing(4.5),
	marginLeft: "auto",
}));

export const ActionButton = styled(Button)(({ theme }) => ({
	textTransform: "none",
	padding: theme.spacing(0.75, 2.25),
	borderRadius: theme.shape.borderRadius,
}));
