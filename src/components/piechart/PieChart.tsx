import React, { useRef, useEffect } from "react";
import { useTheme } from "@mui/material/styles";

interface PieChartProps {
	colors?: string[];
	degrees: number[];
	outlineColor?: string;
	outlineStrokeWidth?: number;
	size?: number;
	backgroundColor?: string;
}

const resolveCssColor = (value: string) => {
	if (typeof window === "undefined") return value;
	if (!value.startsWith("var(")) return value;

	const varName = value.slice(4, -1).trim();
	const computed = getComputedStyle(document.documentElement)
		.getPropertyValue(varName)
		.trim();

	return computed || value;
};

const PieChart: React.FC<PieChartProps> = ({
	colors,
	degrees,
	outlineColor,
	outlineStrokeWidth = 1.5,
	size = 18,
	backgroundColor,
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const theme = useTheme();

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const dpr = window.devicePixelRatio || 1;
		canvas.width = size * dpr;
		canvas.height = size * dpr;
		canvas.style.width = `${size}px`;
		canvas.style.height = `${size}px`;

		ctx.scale(dpr, dpr);

		const centerX = size / 2;
		const centerY = size / 2;
		const radius = (size - outlineStrokeWidth) / 2;

		ctx.clearRect(0, 0, size, size);

		const outline =
			outlineColor ?? theme.palette.surface.onVariant;
		const background =
			backgroundColor ?? theme.palette.surface.base;
		const sliceColors =
			colors ?? [
				theme.palette.surface.onVariant,
				theme.palette.surface.base,
			];

		const resolvedOutline = resolveCssColor(outline);
		const resolvedBackground = resolveCssColor(background);
		const resolvedColors = sliceColors.map(resolveCssColor);

		// Fill base circle with background color to represent uncovered degrees
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fillStyle = resolvedBackground;
		ctx.fill();

		// Draw slices
		let startAngle = -Math.PI / 2;

		degrees.forEach((degree, index) => {
			const sweepAngle = (Math.abs(degree) / 100) * 2 * Math.PI;
			if (sweepAngle <= 0) {
				return;
			}

			ctx.beginPath();
			ctx.moveTo(centerX, centerY);
			ctx.arc(centerX, centerY, radius, startAngle, startAngle + sweepAngle);
			ctx.closePath();
			ctx.fillStyle = resolvedColors[index] ?? resolvedColors[0];
			ctx.fill();

			startAngle += sweepAngle;
		});

		// Outline
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.strokeStyle = resolvedOutline;
		ctx.lineWidth = outlineStrokeWidth;
		ctx.stroke();
	}, [
		backgroundColor,
		colors,
		degrees,
		outlineColor,
		outlineStrokeWidth,
		size,
		theme,
	]);

	return <canvas ref={canvasRef} />;
};

export default PieChart;
