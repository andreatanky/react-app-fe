import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App.tsx";
import "./assets/styles/theme.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Failed to find the root element");
}

createRoot(rootElement).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
