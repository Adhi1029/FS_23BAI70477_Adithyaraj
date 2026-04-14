/**
 * ProtectedRoutes.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Two guard components:
 *
 *  ProtectedRoute  – Checks for a JWT token in sessionStorage.
 *                    Unauthenticated users → redirect to /login.
 *
 *  AdminRoute      – Additional check: role must equal "ADMIN".
 *                    Authenticated non-admins → redirect to /unauthorized.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// ── Auth Guard (token must exist) ────────────────────────────────────────────
export function ProtectedRoute() {
  const token = sessionStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

// ── Admin Guard (token + ADMIN role) ────────────────────────────────────────
export function AdminRoute() {
  const token = sessionStorage.getItem('token');
  const role  = sessionStorage.getItem('role');

  if (!token) return <Navigate to="/login" replace />;
  if (role !== 'ADMIN') return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
}
