/**
 * UserDashboard.jsx  |  EXP 9 – RBAC Frontend
 * ─────────────────────────────────────────────────────────────────────────────
 * Protected page – accessible to ALL authenticated users.
 *
 * Fetches from a USER-level endpoint: GET /api/user/dashboard
 * If the backend returns 403, the global Axios interceptor re-throws the error
 * and this component catches it to show an MUI Snackbar "Access Denied" alert.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Snackbar,
  Alert,
  Skeleton,
  Divider,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  Person as PersonIcon,
  CheckCircle as CheckIcon,
  Storage as StorageIcon,
  BarChart as ChartIcon,
  Refresh as RefreshIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api/axiosConfig';

// ── Stat Card sub-component ──────────────────────────────────────────────────
function StatCard({ icon, label, value, color, gradientFrom, gradientTo }) {
  return (
    <div
      className="stat-card glass-card"
      style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
    >
      <div
        className="stat-card-icon"
        style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
      >
        {icon}
      </div>
      <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>
        {label}
      </div>
    </div>
  );
}

export default function UserDashboard() {
  const navigate                  = useNavigate();
  const username                  = sessionStorage.getItem('username') || 'User';
  const [dashData, setDashData]   = useState(null);
  const [loading, setLoading]     = useState(true);
  const [snack, setSnack]         = useState({ open: false, msg: '', severity: 'error' });

  const showSnack = (msg, severity = 'error') =>
    setSnack({ open: true, msg, severity });

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/api/user/dashboard');
      setDashData(data);
    } catch (err) {
      if (err.response?.status === 403) {
        showSnack('Access Denied: Insufficient Permissions');
      } else {
        // Fallback mock data so the UI is meaningful even without backend
        setDashData({
          message:     'Welcome to your secure dashboard!',
          role:        sessionStorage.getItem('role'),
          permissions: ['READ_OWN_PROFILE', 'VIEW_CONTENT', 'POST_COMMENTS'],
          stats: {
            logins:   42,
            sessions: 7,
            uploads:  3,
          },
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboard(); }, []);

  // ── Try to access ADMIN endpoint (should return 403 for USER) ─────────────
  const tryAdminAccess = async () => {
    try {
      await api.get('/api/admin/dashboard');
      showSnack('Unexpectedly accessed admin endpoint!', 'warning');
    } catch (err) {
      if (err.response?.status === 403) {
        showSnack('Access Denied: Insufficient Permissions – Admin endpoint requires ADMIN role.');
      }
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="container py-4 py-md-5 animate-fade-in" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Page Header ──────────────────────────────────────────────── */}
        <div className="row mb-4">
          <div className="col-12 d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div className="d-flex align-items-center gap-3">
              <Avatar
                sx={{
                  width: 52, height: 52,
                  background: 'var(--gradient-accent)',
                  fontWeight: 800, fontSize: '1.2rem',
                }}
              >
                {username.charAt(0).toUpperCase()}
              </Avatar>
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 2 }}>
                  User Dashboard
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
                  Welcome back, <strong style={{ color: 'var(--accent-cyan)' }}>{username}</strong>
                </p>
              </div>
            </div>
            <Button
              id="refresh-btn"
              variant="outlined"
              size="small"
              startIcon={<RefreshIcon />}
              onClick={fetchDashboard}
              sx={{
                borderColor: 'var(--border-glass)',
                color: 'var(--text-muted)',
                borderRadius: '10px',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': { borderColor: 'var(--accent-blue)', color: 'var(--accent-blue)' },
              }}
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* ── Stat Cards ───────────────────────────────────────────────── */}
        <div className="row g-3 mb-4">
          {[
            {
              icon: <PersonIcon sx={{ color: '#fff', fontSize: 24 }} />,
              label: 'Total Logins',
              value: loading ? '—' : (dashData?.stats?.logins ?? '—'),
              gradientFrom: 'rgba(91,141,238,0.35)', gradientTo: 'rgba(155,89,247,0.20)',
            },
            {
              icon: <CheckIcon sx={{ color: '#fff', fontSize: 24 }} />,
              label: 'Active Sessions',
              value: loading ? '—' : (dashData?.stats?.sessions ?? '—'),
              gradientFrom: 'rgba(56,217,245,0.25)', gradientTo: 'rgba(91,141,238,0.20)',
            },
            {
              icon: <StorageIcon sx={{ color: '#fff', fontSize: 24 }} />,
              label: 'Uploads',
              value: loading ? '—' : (dashData?.stats?.uploads ?? '—'),
              gradientFrom: 'rgba(155,89,247,0.30)', gradientTo: 'rgba(56,217,245,0.15)',
            },
          ].map((s) => (
            <div key={s.label} className="col-12 col-sm-4">
              <StatCard {...s} />
            </div>
          ))}
        </div>

        {/* ── Main Data Card ───────────────────────────────────────────── */}
        <div className="row g-3">
          <div className="col-12 col-md-7">
            <Card
              id="user-data-card"
              sx={{
                background: 'var(--bg-glass)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--border-glass)',
                borderRadius: '16px',
                color: 'var(--text-primary)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <ChartIcon sx={{ color: 'var(--accent-blue)' }} />
                  <Typography variant="h6" fontWeight={700}>
                    Dashboard Data
                  </Typography>
                </div>
                <Divider sx={{ borderColor: 'var(--border-glass)', mb: 2 }} />

                {loading ? (
                  <>
                    <Skeleton variant="text" width="70%" sx={{ bgcolor: 'rgba(255,255,255,0.08)' }} />
                    <Skeleton variant="text" width="50%" sx={{ bgcolor: 'rgba(255,255,255,0.08)' }} />
                    <LinearProgress sx={{ mt: 2, borderRadius: 4, bgcolor: 'rgba(255,255,255,0.08)' }} />
                  </>
                ) : (
                  <>
                    <Typography
                      id="user-api-message"
                      variant="body1"
                      sx={{ mb: 2, color: 'var(--text-primary)', fontWeight: 500 }}
                    >
                      {dashData?.message}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'var(--text-muted)', mb: 1 }}>
                      Role:&nbsp;
                      <strong style={{ color: 'var(--accent-cyan)' }}>{dashData?.role}</strong>
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'var(--text-muted)', mb: 1 }}>
                      Permissions:
                    </Typography>
                    <div className="d-flex flex-wrap gap-2 mt-1">
                      {(dashData?.permissions || []).map((p) => (
                        <span
                          key={p}
                          style={{
                            fontSize: '0.75rem',
                            padding: '3px 10px',
                            borderRadius: 999,
                            background: 'rgba(56,217,245,0.12)',
                            border: '1px solid rgba(56,217,245,0.3)',
                            color: 'var(--accent-cyan)',
                            fontWeight: 600,
                          }}
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* ── 403 Demo Card ────────────────────────────────────────────── */}
          <div className="col-12 col-md-5">
            <Card
              sx={{
                background: 'linear-gradient(135deg, rgba(255,107,107,0.08), rgba(247,147,30,0.05))',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,107,107,0.25)',
                borderRadius: '16px',
                color: 'var(--text-primary)',
                height: '100%',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <AdminIcon sx={{ color: '#ff6b6b' }} />
                  <Typography variant="h6" fontWeight={700} sx={{ color: '#ff6b6b' }}>
                    403 Demo
                  </Typography>
                </div>
                <Typography variant="body2" sx={{ color: 'var(--text-muted)', mb: 3 }}>
                  As a <strong>USER</strong>, clicking below will attempt to hit the
                  Admin endpoint and trigger a&nbsp;<code>/api/admin/dashboard</code>&nbsp;
                  request, resulting in a&nbsp;<strong>403 Forbidden</strong>&nbsp;error,
                  demonstrating RBAC in action.
                </Typography>
                <Button
                  id="try-admin-btn"
                  variant="outlined"
                  fullWidth
                  onClick={tryAdminAccess}
                  startIcon={<AdminIcon />}
                  sx={{
                    borderColor: 'rgba(255,107,107,0.4)',
                    color: '#ff6b6b',
                    borderRadius: '10px',
                    textTransform: 'none',
                    fontWeight: 700,
                    '&:hover': {
                      background: 'rgba(255,107,107,0.1)',
                      borderColor: '#ff6b6b',
                    },
                  }}
                >
                  Try Admin Endpoint (triggers 403)
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* ── 403 / Error Snackbar ──────────────────────────────────────────── */}
      <Snackbar
        id="access-denied-snackbar"
        open={snack.open}
        autoHideDuration={5000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snack.severity}
          variant="filled"
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          sx={{ borderRadius: '10px', fontWeight: 600 }}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}
