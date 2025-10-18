import styled from "@emotion/styled";

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
