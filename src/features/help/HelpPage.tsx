import styled from "@emotion/styled";

const Container = styled("section")(({ theme }) => ({
	display: "grid",
	gap: theme.spacing(3),
	color: theme.palette.surface.on,
	"& h1": {
		fontSize: "clamp(2rem, 2.5vw, 2.75rem)",
		marginBottom: theme.spacing(1),
	},
	"& p": {
		margin: 0,
		color: theme.palette.surface.onVariant,
	},
}));

export const HelpPage = () => (
	<Container>
		<header>
			<h1>Need Assistance?</h1>
			<p>Find troubleshooting tips, FAQs, and contact information.</p>
		</header>
	</Container>
);
