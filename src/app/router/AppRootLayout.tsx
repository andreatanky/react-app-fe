import type { PropsWithChildren } from "react";
import styled from "@emotion/styled";

const Root = styled("div")(({ theme }) => ({
	minHeight: "100vh",
	width: "100%",
	display: "flex",
	flexDirection: "column",
	backgroundColor: theme.palette.surface.container,
	color: theme.palette.surface.on,
}));

const Main = styled("main")(({ theme }) => ({
	flex: 1,
	padding: 0,
	backgroundColor: theme.palette.surface.container,
	color: theme.palette.surface.on,
}));

export const AppRootLayout = ({ children }: PropsWithChildren) => (
	<Root>
		<Main>{children}</Main>
	</Root>
);
