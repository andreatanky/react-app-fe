import dailyNewsLogo from "@/assets/images/dailynews_logo.png";
import { HomeFilterBar } from "../../../components/search/HomeFilterbar";
import {
	ActionButton,
	Actions,
	BottomRow,
	Container,
	Content,
	FullWidthDivider,
	Logo,
	TopRow,
} from "./CompactNavBar.styled";

type CompactNavBarProps = {
	visible: boolean;
	onSearchAction: () => void;
	onHelp: () => void;
	onLogout: () => void;
};

export const CompactNavBar = ({
	visible,
	onSearchAction,
	onHelp,
	onLogout,
}: CompactNavBarProps) => (
	<Container visible={visible}>
		<Content>
			<TopRow>
				<Logo src={dailyNewsLogo} alt="DailyNews" />
				<Actions>
					<ActionButton type="button" color="inherit" onClick={onSearchAction}>
						Search
					</ActionButton>
					<ActionButton type="button" color="inherit" onClick={onHelp}>
						Help &amp; FAQ
					</ActionButton>
					<ActionButton type="button" color="inherit" onClick={onLogout}>
						Log Out
					</ActionButton>
				</Actions>
			</TopRow>

			<FullWidthDivider />
			<BottomRow>
				<HomeFilterBar />
			</BottomRow>
		</Content>
	</Container>
);

export default CompactNavBar;
