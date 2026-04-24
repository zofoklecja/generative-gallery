import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Leva } from "leva";

const theme = {
	colors: {
		elevation1: "#ababac",
		elevation2: "#dddddd",
		elevation3: "#ffffff",
		accent1: "#0066DC",
		accent2: "#007BFF",
		accent3: "#3C93FF",
		highlight1: "#535760",
		highlight2: "#5e5e5e",
		highlight3: "#FEFEFE",
		vivid1: "#ffcc00",
	},
};

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Leva theme={theme} />
		<App />
	</StrictMode>,
);
