/**
 * App.jsx  |  EXP 9 – RBAC React Frontend
 * ─────────────────────────────────────────────────────────────────────────────
 * Root routing configuration using React Router DOM v6.
 *
 * Route Structure:
 *  /                    → redirect to /login
 *  /login               → Login page (public)
 *
 *  Protected (token required):
 *    /user-dashboard    → UserDashboard
 *    /profile           → Profile
 *
 *  Admin-only (token + ADMIN role):
 *    /admin-dashboard   → AdminDashboard
 *
 *  /unauthorized        → 403 page (public, for redirect target)
 *  *                    → 404 fallback → /login
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { ProtectedRoute, AdminRoute } from './components/ProtectedRoutes';

import Login          from './pages/Login';
import UserDashboard  from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Profile        from './pages/Profile';
import Unauthorized   from './pages/Unauthorized';

// ── MUI dark theme override ─────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary:   { main: '#5b8dee' },
    secondary: { main: '#9b59f7' },
    error:     { main: '#ff6b6b' },
    background: {
      default: '#0a0e1a',
      paper:   'rgba(255, 255, 255, 0.06)',
    },
    text: {
      primary:   '#eef2ff',
      secondary: '#94a3b8',
    },
  },
  typography: {
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  shape: { borderRadius: 10 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { background: 'transparent' },
      },
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* ── Default redirect ─────────────────────────────────── */}
          <Route index element={<Navigate to="/login" replace />} />

          {/* ── Public routes ────────────────────────────────────── */}
          <Route path="/login"        element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* ── Protected routes (token required) ────────────────── */}
          <Route element={<ProtectedRoute />}>
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/profile"        element={<Profile />} />
          </Route>

          {/* ── Admin-only routes (ADMIN role required) ───────────── */}
          <Route element={<AdminRoute />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>

          {/* ── 404 fallback ─────────────────────────────────────── */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
