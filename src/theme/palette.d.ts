import "@mui/material/styles";

declare module "@mui/material/styles" {
	interface Palette {
		surface: {
			base: string;
			bright: string;
			dim: string;
			containerLowest: string;
			containerLow: string;
			container: string;
			containerHigh: string;
			containerHighest: string;
			on: string;
			onVariant: string;
			outline: string;
			outlineVariant: string;
			inverse: string;
			inverseOn: string;
		};
		tones: {
			primary: string;
			onPrimary: string;
			primaryContainer: string;
			onPrimaryContainer: string;
			secondary: string;
		};
	}

	interface PaletteOptions {
		surface?: Partial<Palette["surface"]>;
		tones?: Partial<Palette["tones"]>;
	}
}
