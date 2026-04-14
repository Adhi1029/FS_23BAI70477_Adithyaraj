/**
 * App.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Root application component.
 *
 * Route map:
 *   /          → redirect to /login
 *   /login     → Login page (public)
 *   /dashboard → Dashboard page (protected by ProtectedRoute)
 *   *          → redirect to /login (catch-all)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Global MUI theme override
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

// Pages & Components
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// Bootstrap – layout/grid only (no JS components needed)
import "bootstrap/dist/css/bootstrap.min.css";

// ── Custom MUI Dark Theme ─────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7c4dff",
    },
    secondary: {
      main: "#00e5ff",
    },
    background: {
      default: "#0f0c29",
      paper: "rgba(255,255,255,0.05)",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
});

// ── Application Router ────────────────────────────────────────────────────────
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes — wrapped by ProtectedRoute */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
