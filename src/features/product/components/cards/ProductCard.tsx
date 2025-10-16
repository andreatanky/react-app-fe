import styled from "@emotion/styled";
import type { KeyboardEvent } from "react";
import card_background from "@/assets/images/card_background_dark.svg";
import { isDesktopOnlyProduct } from "../../../../utils/productUtils";
import type { Product } from "../../models/Product";
import ProductCardFooter from "./ProductCardFooter";
import ProductCardHeader from "./ProductCardHeader";

// ========================
// Styled Components (Emotion)
// ========================

const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem 1.2rem;
  border: 1px solid var(--color-outline);
  color: var(--color-on-surface, #ffffff);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &.read {
    background: var(--color-surface);
  }

  &.unread {
    background: var(--color-surface-bright);
    border-left: 4px solid var(--color-outline);
  }

  &.expired {
    background: var(--color-surface-container);
    border-left: none;
    border-right: none;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  }
`;

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

const Title = styled.h3`
  margin: 0;
  font-size: clamp(1.1rem, 1.8vw, 1.35rem);
  line-height: 1.35;
  color: var(--color-on-surface, #ffffff);
  font-weight: 400;

  &.titleClamp {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

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
	const titleClass = expired ? "titleClamp" : "";

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
