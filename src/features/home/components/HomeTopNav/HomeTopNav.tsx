import type { HTMLAttributes } from "react";
import { Container, Spacer, Actions, ActionButton } from "./HomeTopNav.styled";

type HomeTopNavProps = {
	onHelp: () => void;
	onLogout: () => void;
} & HTMLAttributes<HTMLElement>;

export const HomeTopNav = ({ onHelp, onLogout }: HomeTopNavProps) => {
	return (
		<nav role="navigation" aria-label="Home top navigation">
			<Container>
				<Spacer />
				<Actions>
					<ActionButton
						type="button"
						color="inherit"
						onClick={onHelp}
						aria-label="Help"
					>
						Help
					</ActionButton>
					<ActionButton
						type="button"
						color="inherit"
						onClick={onLogout}
						aria-label="Log Out"
					>
						Log Out
					</ActionButton>
				</Actions>
			</Container>
		</nav>
	);
};
