/**
 * Unauthorized.jsx  |  EXP 9 – RBAC Frontend
 * Displayed when a USER tries to access an ADMIN-only route.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { Block as BlockIcon, ArrowBack as BackIcon } from '@mui/icons-material';

export default function Unauthorized() {
  const navigate = useNavigate();
  const role     = sessionStorage.getItem('role') || 'USER';

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh', padding: '2rem', position: 'relative', zIndex: 1 }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-9 col-md-6 col-lg-5">
            <div className="glass-card p-5 text-center animate-slide-up">

              {/* Icon */}
              <div
                style={{
                  width: 80, height: 80,
                  background: 'linear-gradient(135deg, rgba(255,107,107,0.2), rgba(247,147,30,0.15))',
                  border: '2px solid rgba(255,107,107,0.4)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                }}
              >
                <BlockIcon sx={{ fontSize: 40, color: '#ff6b6b' }} />
              </div>

              {/* Heading */}
              <Typography variant="h4" fontWeight={800} sx={{ mb: 1, color: '#ff6b6b' }}>
                403 – Forbidden
              </Typography>
              <Typography variant="body1" sx={{ color: 'var(--text-muted)', mb: 1 }}>
                You do not have permission to access this page.
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--text-muted)', mb: 3 }}>
                Your current role is&nbsp;
                <strong style={{ color: 'var(--accent-cyan)' }}>{role}</strong>.
                This resource requires the <strong style={{ color: '#ff6b6b' }}>ADMIN</strong> role.
              </Typography>

              {/* RBAC explanation */}
              <div
                style={{
                  background: 'rgba(255,107,107,0.08)',
                  border: '1px solid rgba(255,107,107,0.2)',
                  borderRadius: 12,
                  padding: '1rem',
                  marginBottom: '1.5rem',
                  textAlign: 'left',
                }}
              >
                <Typography variant="caption" sx={{ color: 'var(--text-muted)', lineHeight: 1.8, display: 'block' }}>
                  <strong style={{ color: '#ff6b6b' }}>RBAC Policy:</strong> Role-Based Access Control
                  restricts system access based on assigned roles. The <code>/admin-dashboard</code> route
                  is protected by the&nbsp;<code>AdminRoute</code>&nbsp;guard which checks
                  &nbsp;<code>sessionStorage.getItem('role') === 'ADMIN'</code> before rendering.
                </Typography>
              </div>

              <Button
                id="go-back-btn"
                variant="contained"
                startIcon={<BackIcon />}
                onClick={() => navigate('/user-dashboard', { replace: true })}
                sx={{
                  background: 'var(--gradient-accent)',
                  borderRadius: '10px',
                  fontWeight: 700,
                  textTransform: 'none',
                  px: 3,
                  '&:hover': { filter: 'brightness(1.15)' },
                }}
              >
                Back to User Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
