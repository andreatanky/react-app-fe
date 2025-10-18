import styled from "@emotion/styled";
import type { KeyboardEvent } from "react";
import card_background from "@/assets/images/card_background_dark.svg";
import { isDesktopOnlyProduct } from "../../../../utils/productUtils";
import type { Product } from "../../models/Product";
import ProductCardFooter from "./ProductCardFooter";
import ProductCardHeader from "./ProductCardHeader";

const Card = styled.article(({ theme }) => ({
	position: "relative",
	display: "flex",
	flexDirection: "column",
	width: "100%",
	padding: "1rem 1.2rem",
	border: `1px solid ${theme.palette.surface.outline}`,
	color: theme.palette.surface.on,
	transition: "transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease",
	"&.read": {
		background: theme.palette.surface.base,
	},
	"&.unread": {
		background: theme.palette.surface.bright,
		borderLeft: `4px solid ${theme.palette.surface.outline}`,
	},
	"&.expired": {
		background: theme.palette.surface.container,
		borderLeft: "none",
		borderRight: "none",
	},
	"&:hover": {
		transform: "translateY(-2px)",
		boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
		background: theme.palette.surface.container,
	},
}));

const Background = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: auto;
  max-width: 55%;
  object-fit: contain;
  pointer-events: none;
  z-index: 0;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.h3(({ theme }) => ({
	margin: 0,
	fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
	lineHeight: 1.35,
	color: theme.palette.surface.on,
	fontWeight: 400,
	"&.titleClamp": {
		display: "-webkit-box",
		WebkitLineClamp: 2,
		WebkitBoxOrient: "vertical",
		overflow: "hidden",
	},
	"&.activeTitle": {
		textDecoration: "underline",
	},
}));

// ========================
// Logic
// ========================

const dateFormatter = new Intl.DateTimeFormat(undefined, {
	month: "short",
	day: "numeric",
});

const formatDate = (raw: string) => {
	const parsed = Date.parse(raw);
	if (Number.isNaN(parsed)) return null;
	return dateFormatter.format(new Date(parsed));
};

const pluralise = (value: number, unit: string) =>
	`${value} ${unit}${value === 1 ? "" : "s"}`;

const isExpired = (rawExpiry: string) => {
	const parsed = Date.parse(rawExpiry);
	if (Number.isNaN(parsed)) return false;
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	return parsed < today.getTime();
};

const getProgressPercent = (value: number) => {
	if (!Number.isFinite(value)) return 0;
	if (value <= 1) return Math.round(value * 100);
	return Math.round(Math.min(value, 100));
};

export const ProductCard = ({
	product,
	onProductClick,
	className,
}: {
	product: Product;
	onProductClick: (id: string) => void;
	className?: string;
}) => {
	const publishedDisplay = formatDate(product.publishedDate);
	const progressPercent = getProgressPercent(product.readProgress);
	const readDurationLabel = pluralise(product.readingDuration, "minute");
	const isRead = product.isRead;
	const showDesktopLabel = isDesktopOnlyProduct(product.classification);
	const pieChartDegrees = [progressPercent, 100 - progressPercent];
	const expired = isExpired(product.expiryDate);

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			onProductClick(product.systemDocId);
		}
	};

	const statusClass = expired ? "expired" : isRead ? "read" : "unread";
	const titleClass = `${expired ? "titleClamp" : ""} ${!expired ? "activeTitle" : ""}`.trim();

	return (
		<Card
			className={`${statusClass} ${className ?? ""}`}
			onClick={() => onProductClick(product.systemDocId)}
			onKeyDown={handleKeyDown}
			tabIndex={0}
		>
			{!expired && !isRead && <Background src={card_background} alt="" />}

			<Content>
				<ProductCardHeader
					publishedDisplay={publishedDisplay}
					expired={expired}
					isUrgent={product.isUrgent}
				/>
				<Title className={titleClass}>{product.title}</Title>
				<ProductCardFooter
					showDesktopLabel={showDesktopLabel}
					isRead={isRead}
					progressPercent={progressPercent}
					readDurationLabel={readDurationLabel}
					pieChartDegrees={pieChartDegrees}
				/>
			</Content>
		</Card>
	);
};

export default ProductCard;
