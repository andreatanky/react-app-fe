import Grid from "@mui/material/Grid";
import styled from "@emotion/styled";

export const Panes = styled(Grid)(() => ({
	width: "100%",
}));

export const Pane = styled("article")(({ theme }) => ({
	display: "grid",
	gap: theme.spacing(2),
}));

export const LazyStatus = styled("p")(({ theme }) => ({
	marginTop: theme.spacing(1.5),
	fontSize: theme.typography.body2.fontSize,
	color: theme.palette.text.secondary,
}));
