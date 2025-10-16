import styled from "@emotion/styled";
import type { ReactNode } from "react";
import interpunct from "@/assets/icons/interpunct.svg";
import task_read from "@/assets/icons/task_alt.svg";
import Label from "../../../../components/labels/Label";
import PieChart from "../../../../components/piechart/PieChart";

const Footer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  color: var(--color-on-surface-variant);
  font-size: 0.9rem;
`;

const ReadStatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const FooterItem = styled.span`
  display: inline-flex;
  align-items: center;
`;

const Separator = styled.img`
  width: 4px;
  height: 4px;
  margin-top: 4px;
`;

const Icon = styled.img`
  width: 18px;
  height: 18px;
`;

const IconSpacer = styled.div`width: 0.3rem;`;

const DesktopOnlyLabel = styled(Label)`
  margin-right: 0.5rem;
`;

export const ProductCardFooter = ({
	showDesktopLabel,
	isRead,
	progressPercent,
	readDurationLabel,
	pieChartDegrees,
}: {
	showDesktopLabel: boolean;
	isRead: boolean;
	progressPercent: number;
	readDurationLabel: string;
	pieChartDegrees: number[];
}) => {
	const segments: ReactNode[] = [];

	if (!isRead) {
		segments.push(<span key="status-unread">Unread</span>);
	} else if (progressPercent >= 100) {
		segments.push(
			<>
				<Icon src={task_read} alt="Complete" />
				<IconSpacer />
				<span>Read</span>
			</>,
		);
	} else {
		segments.push(
			<>
				<PieChart degrees={pieChartDegrees} />
				<IconSpacer />
				<span>In Progress</span>
			</>,
		);
	}

	return (
		<Footer>
			{showDesktopLabel && (
				<DesktopOnlyLabel
					text="Desktop Only"
					backgroundColor="var(--color-on-surface-variant)"
					textColor="var(--color-surface)"
				/>
			)}
			<ReadStatusContainer>
				<FooterItem>{segments}</FooterItem>
				<Separator src={interpunct} alt="" aria-hidden="true" />
				<FooterItem>{readDurationLabel}</FooterItem>
			</ReadStatusContainer>
		</Footer>
	);
};

export default ProductCardFooter;
