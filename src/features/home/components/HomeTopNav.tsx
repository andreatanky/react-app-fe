import type { HTMLAttributes } from "react";
import { ActionButton, Actions, Container, Spacer } from "./HomeTopNav.styled";
import LogoutIcon from '@mui/icons-material/Logout';

type HomeTopNavProps = {
	onHelp: () => void;
	onLogout: () => void;
} & HTMLAttributes<HTMLElement>;

export const HomeTopNav = ({ onHelp, onLogout }: HomeTopNavProps) => {
	return (
		<nav aria-label="Home top navigation">
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
						<LogoutIcon/>
						Log Out
					</ActionButton>
				</Actions>
			</Container>
		</nav>
	);
};
