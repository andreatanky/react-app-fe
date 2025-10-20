import styled from "@emotion/styled";
import type { ButtonProps } from "@mui/material/Button";
import Button from "@mui/material/Button";
import type { ReactNode } from "react";
import { forwardRef } from "react";

type StyledButtonProps = {
	$backgroundColor?: string;
	$hoverBackgroundColor?: string;
	$textColor?: string;
};

const StyledButton = styled(Button, {
	shouldForwardProp: (prop) =>
		!["$backgroundColor", "$hoverBackgroundColor", "$textColor"].includes(
			prop as string,
		),
})<StyledButtonProps>(
	({ theme, $backgroundColor, $hoverBackgroundColor, $textColor }) => {
		const baseStyles = {
			textTransform: "none" as const,
			padding: theme.spacing(0.75, 2.25),
			borderRadius: theme.shape.borderRadius,
			gap: theme.spacing(0.25),
		} as const;

		const backgroundStyles =
			$backgroundColor !== undefined
				? { backgroundColor: $backgroundColor }
				: {};

		const colorStyles = $textColor !== undefined ? { color: $textColor } : {};

		const hoverBackground =
			$hoverBackgroundColor ??
			($backgroundColor !== undefined ? $backgroundColor : undefined);

		const hoverStyles =
			hoverBackground !== undefined
				? { "&:hover": { backgroundColor: hoverBackground } }
				: {};

		return {
			...baseStyles,
			...backgroundStyles,
			...colorStyles,
			...hoverStyles,
		};
	},
);

export type ActionButtonWithTextAndIconProps = Omit<
	ButtonProps,
	"children" | "startIcon"
> & {
	label: string;
	icon?: ReactNode;
	backgroundColor?: string;
	hoverBackgroundColor?: string;
	textColor?: string;
};

export const ActionButtonWithTextAndIcon = forwardRef<
	HTMLButtonElement,
	ActionButtonWithTextAndIconProps
>(
	(
		{ label, icon, backgroundColor, hoverBackgroundColor, textColor, ...rest },
		ref,
	) => {
		return (
			<StyledButton
				ref={ref}
				startIcon={icon}
				$backgroundColor={backgroundColor}
				$hoverBackgroundColor={hoverBackgroundColor}
				$textColor={textColor}
				{...rest}
			>
				{label}
			</StyledButton>
		);
	},
);

ActionButtonWithTextAndIcon.displayName = "ActionButtonWithTextAndIcon";
