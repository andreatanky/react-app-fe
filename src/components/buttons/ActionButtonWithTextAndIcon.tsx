import styled from "@emotion/styled";
import Button from "@mui/material/Button";

export const ActionButton = styled(Button)(({ theme }) => ({
	textTransform: "none",
	padding: theme.spacing(0.75, 2.25),
	borderRadius: theme.shape.borderRadius,
	gap: "6px"
}));



