import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import {
	createContext,
	type PropsWithChildren,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

import { darkTheme, lightTheme } from "../../theme";

const THEME_STORAGE_KEY = "app.theme";

export type ThemeName = "light" | "dark";

type ThemeContextValue = {
	theme: ThemeName;
	setTheme: (theme: ThemeName) => void;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const readStoredTheme = (): ThemeName | null => {
	if (typeof window === "undefined") {
		return null;
	}

	const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
	return stored === "light" || stored === "dark" ? stored : null;
};

const getInitialTheme = (): {
	theme: ThemeName;
	hasUserPreference: boolean;
} => {
	const storedTheme = readStoredTheme();

	if (storedTheme) {
		return { theme: storedTheme, hasUserPreference: true };
	}

	return {
		theme: "dark",
		hasUserPreference: false,
	};
};

const applyTheme = (theme: ThemeName) => {
	if (typeof document === "undefined") {
		return;
	}

	document.documentElement.dataset.theme = theme;
	document.documentElement.style.setProperty("color-scheme", theme);
};

export const ThemeProvider = ({ children }: PropsWithChildren) => {
	const [{ theme, hasUserPreference }, setThemeState] = useState(() => {
		const initial = getInitialTheme();

		if (typeof document !== "undefined") {
			applyTheme(initial.theme);
		}

		return initial;
	});

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		applyTheme(theme);

		if (hasUserPreference) {
			window.localStorage.setItem(THEME_STORAGE_KEY, theme);
		} else {
			window.localStorage.removeItem(THEME_STORAGE_KEY);
		}
	}, [theme, hasUserPreference]);

	const setTheme = useCallback((nextTheme: ThemeName) => {
		setThemeState({
			theme: nextTheme,
			hasUserPreference: true,
		});
	}, []);

	const toggleTheme = useCallback(() => {
		setThemeState((current) => ({
			theme: current.theme === "light" ? "dark" : "light",
			hasUserPreference: true,
		}));
	}, []);

	const value = useMemo<ThemeContextValue>(
		() => ({
			theme,
			setTheme,
			toggleTheme,
		}),
		[setTheme, theme, toggleTheme],
	);

	return (
		<ThemeContext.Provider value={value}>
			<MuiThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
				{children}
			</MuiThemeProvider>
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}

	return context;
};
