/**
 * Navbar.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Sticky top navigation bar rendered on all protected pages.
 *
 * Role-Based Visibility:
 *  • "User Profile" link  → always visible when authenticated
 *  • "Admin Panel" link   → only visible when role === "ADMIN"
 *  • Logout button        → clears sessionStorage and redirects to /login
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Tooltip,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  AdminPanelSettings as AdminIcon,
  AccountCircle as ProfileIcon,
  Logout as LogoutIcon,
  Shield as ShieldIcon,
} from '@mui/icons-material';

export default function Navbar() {
  const navigate  = useNavigate();
  const role      = sessionStorage.getItem('role') || '';
  const username  = sessionStorage.getItem('username') || 'User';
  const isAdmin   = role === 'ADMIN';

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg app-navbar">
      <div className="container-fluid">

        {/* ── Brand ─────────────────────────────────────────────────────── */}
        <span className="navbar-brand d-flex align-items-center gap-2">
          <ShieldIcon sx={{ fontSize: 22, color: '#5b8dee' }} />
          RBAC&nbsp;App
        </span>

        {/* ── Toggle (mobile) ───────────────────────────────────────────── */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ color: 'var(--text-muted)' }}
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* ── Nav Links ─────────────────────────────────────────────────── */}
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-1">

            {/* User Dashboard – visible to all authenticated users */}
            <li className="nav-item">
              <NavLink to="/user-dashboard" className="nav-link d-flex align-items-center gap-1">
                <DashboardIcon sx={{ fontSize: 18 }} />
                My Dashboard
              </NavLink>
            </li>

            {/* User Profile – visible to all authenticated users */}
            <li className="nav-item">
              <NavLink to="/profile" className="nav-link d-flex align-items-center gap-1">
                <ProfileIcon sx={{ fontSize: 18 }} />
                User Profile
              </NavLink>
            </li>

            {/* Admin Panel – ONLY visible to ADMIN role */}
            {isAdmin && (
              <li className="nav-item">
                <NavLink to="/admin-dashboard" className="nav-link d-flex align-items-center gap-1"
                  style={{ color: '#ff6b6b' }}>
                  <AdminIcon sx={{ fontSize: 18 }} />
                  Admin Panel
                </NavLink>
              </li>
            )}
          </ul>

          {/* ── Right section: role chip + user + logout ─────────────────── */}
          <div className="d-flex align-items-center gap-3">
            {/* Role badge */}
            <Chip
              label={isAdmin ? '⚡ ADMIN' : '👤 USER'}
              size="small"
              className={isAdmin ? 'role-badge role-badge-admin' : 'role-badge role-badge-user'}
              sx={{
                fontWeight: 700,
                fontSize: '0.72rem',
                letterSpacing: '0.5px',
                backgroundColor: 'transparent',
                border: 'none',
              }}
            />

            {/* Username */}
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>
              {username}
            </span>

            {/* Logout */}
            <Tooltip title="Logout" arrow>
              <IconButton
                id="logout-btn"
                onClick={handleLogout}
                size="small"
                sx={{
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '8px',
                  padding: '6px',
                  transition: 'all 0.2s',
                  '&:hover': {
                    color: '#ff6b6b',
                    borderColor: 'rgba(255,107,107,0.4)',
                    background: 'rgba(255,107,107,0.1)',
                  },
                }}
              >
                <LogoutIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </nav>
  );
}
