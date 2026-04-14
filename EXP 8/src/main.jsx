/**
 * main.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Application entry point.
 * Mounts the React application into the #root DOM node defined in index.html.
 *
 * The "@fontsource/inter" package is the zero-config way to load Inter locally.
 * If the package is not installed you can alternatively add the Google Fonts
 * <link> tag in index.html.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
