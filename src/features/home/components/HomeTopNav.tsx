import LogoutIcon from "@mui/icons-material/Logout";
import type { HTMLAttributes } from "react";

import { ActionButtonWithTextAndIcon } from "../../../components/buttons/ActionButtonWithTextAndIcon";

import { Actions, Container, Spacer } from "./HomeTopNav.styled";

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
					<ActionButtonWithTextAndIcon
						type="button"
						color="inherit"
						onClick={onHelp}
						aria-label="Help"
						label="Help"
					/>
					<ActionButtonWithTextAndIcon
						type="button"
						color="inherit"
						onClick={onLogout}
						aria-label="Log Out"
						icon={<LogoutIcon />}
						label="Log Out"
					/>
				</Actions>
			</Container>
		</nav>
	);
};
