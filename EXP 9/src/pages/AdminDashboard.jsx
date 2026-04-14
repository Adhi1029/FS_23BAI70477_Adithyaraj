/**
 * AdminDashboard.jsx  |  EXP 9 – RBAC Frontend
 * ─────────────────────────────────────────────────────────────────────────────
 * Protected page – accessible ONLY to ADMIN role (guarded by AdminRoute).
 *
 * Fetches from the admin endpoint: GET /api/admin/dashboard
 * Displays sensitive administrative data and controls.
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
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from '@mui/material';
import {
  AdminPanelSettings as AdminIcon,
  Group as GroupIcon,
  Security as SecurityIcon,
  BarChart as ChartIcon,
  Refresh as RefreshIcon,
  VerifiedUser as VerifiedIcon,
  Warning as WarnIcon,
} from '@mui/icons-material';
import Navbar from '../components/Navbar';
import api from '../api/axiosConfig';

// ── Mock users table for UI richness ─────────────────────────────────────────
const MOCK_USERS = [
  { id: 1, username: 'admin',   role: 'ADMIN', status: 'Active',   logins: 87 },
  { id: 2, username: 'alice',   role: 'USER',  status: 'Active',   logins: 34 },
  { id: 3, username: 'bob',     role: 'USER',  status: 'Inactive', logins: 12 },
  { id: 4, username: 'charlie', role: 'USER',  status: 'Active',   logins: 59 },
];

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, gradientFrom, gradientTo }) {
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

export default function AdminDashboard() {
  const username                = sessionStorage.getItem('username') || 'Admin';
  const [dashData, setDashData] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [snack, setSnack]       = useState({ open: false, msg: '', severity: 'error' });

  const showSnack = (msg, severity = 'error') =>
    setSnack({ open: true, msg, severity });

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/api/admin/dashboard');
      setDashData(data);
    } catch (err) {
      if (err.response?.status === 403) {
        showSnack('Access Denied: Insufficient Permissions');
      } else {
        // Fallback mock data
        setDashData({
          message:     'Welcome to the Admin Control Panel!',
          role:        'ADMIN',
          totalUsers:  4,
          activeUsers: 3,
          pendingAlerts: 2,
          systemStatus: 'Operational',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboard(); }, []);

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
                  background: 'var(--gradient-admin)',
                  fontWeight: 800, fontSize: '1.4rem',
                }}
              >
                <AdminIcon />
              </Avatar>
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 2 }}>
                  Admin Control Panel
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
                  Signed in as&nbsp;
                  <strong style={{ color: '#ff6b6b' }}>{username}</strong>
                  &nbsp;·&nbsp;
                  <Chip
                    label="⚡ ADMINISTRATOR"
                    size="small"
                    sx={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      background: 'rgba(255,107,107,0.15)',
                      color: '#ff6b6b',
                      border: '1px solid rgba(255,107,107,0.3)',
                    }}
                  />
                </p>
              </div>
            </div>
            <Button
              id="admin-refresh-btn"
              variant="outlined"
              size="small"
              startIcon={<RefreshIcon />}
              onClick={fetchDashboard}
              sx={{
                borderColor: 'rgba(255,107,107,0.4)',
                color: '#ff6b6b',
                borderRadius: '10px',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': { borderColor: '#ff6b6b', background: 'rgba(255,107,107,0.08)' },
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
              icon: <GroupIcon sx={{ color: '#fff', fontSize: 24 }} />,
              label: 'Total Users',
              value: loading ? '—' : (dashData?.totalUsers ?? 4),
              gradientFrom: 'rgba(255,107,107,0.35)',
              gradientTo:   'rgba(247,147,30,0.20)',
            },
            {
              icon: <VerifiedIcon sx={{ color: '#fff', fontSize: 24 }} />,
              label: 'Active Users',
              value: loading ? '—' : (dashData?.activeUsers ?? 3),
              gradientFrom: 'rgba(91,141,238,0.35)',
              gradientTo:   'rgba(155,89,247,0.20)',
            },
            {
              icon: <WarnIcon sx={{ color: '#fff', fontSize: 24 }} />,
              label: 'Pending Alerts',
              value: loading ? '—' : (dashData?.pendingAlerts ?? 2),
              gradientFrom: 'rgba(247,147,30,0.30)',
              gradientTo:   'rgba(255,107,107,0.15)',
            },
            {
              icon: <ChartIcon sx={{ color: '#fff', fontSize: 24 }} />,
              label: 'System Status',
              value: loading ? '—' : '✅',
              gradientFrom: 'rgba(56,217,245,0.25)',
              gradientTo:   'rgba(91,141,238,0.15)',
            },
          ].map((s) => (
            <div key={s.label} className="col-6 col-md-3">
              <StatCard {...s} />
            </div>
          ))}
        </div>

        {/* ── API Response Card ────────────────────────────────────────── */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-6">
            <Card
              id="admin-data-card"
              sx={{
                background: 'linear-gradient(135deg, rgba(255,107,107,0.08), rgba(247,147,30,0.05))',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,107,107,0.25)',
                borderRadius: '16px',
                color: 'var(--text-primary)',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <SecurityIcon sx={{ color: '#ff6b6b' }} />
                  <Typography variant="h6" fontWeight={700}>
                    Admin API Response
                  </Typography>
                </div>
                <Divider sx={{ borderColor: 'rgba(255,107,107,0.2)', mb: 2 }} />
                {loading ? (
                  <>
                    <Skeleton variant="text" width="80%" sx={{ bgcolor: 'rgba(255,255,255,0.08)' }} />
                    <LinearProgress sx={{ mt: 2, borderRadius: 4, bgcolor: 'rgba(255,255,255,0.08)' }} />
                  </>
                ) : (
                  <>
                    <Typography
                      id="admin-api-message"
                      variant="body1"
                      sx={{ mb: 2, fontWeight: 600, color: 'var(--text-primary)' }}
                    >
                      {dashData?.message}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>
                      System:&nbsp;
                      <strong style={{ color: '#4ade80' }}>
                        {dashData?.systemStatus ?? 'Operational'}
                      </strong>
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* ── Security Info Card ───────────────────────────────────────── */}
          <div className="col-12 col-md-6">
            <Card
              sx={{
                background: 'var(--bg-glass)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--border-glass)',
                borderRadius: '16px',
                color: 'var(--text-primary)',
                height: '100%',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <SecurityIcon sx={{ color: 'var(--accent-blue)' }} />
                  <Typography variant="h6" fontWeight={700}>
                    RBAC Configuration
                  </Typography>
                </div>
                <Divider sx={{ borderColor: 'var(--border-glass)', mb: 2 }} />
                {[
                  { label: 'JWT Expiry', value: '1 hour' },
                  { label: 'Token Storage', value: 'sessionStorage' },
                  { label: 'Auth Scheme', value: 'Bearer Token' },
                  { label: 'Roles', value: 'ADMIN, USER' },
                ].map(({ label, value }) => (
                  <div key={label} className="d-flex justify-content-between mb-2">
                    <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>{label}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--accent-cyan)' }}>{value}</Typography>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ── Users Table ──────────────────────────────────────────────── */}
        <div className="row">
          <div className="col-12">
            <Card
              id="admin-users-table"
              sx={{
                background: 'var(--bg-glass)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--border-glass)',
                borderRadius: '16px',
                color: 'var(--text-primary)',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <GroupIcon sx={{ color: 'var(--accent-purple)' }} />
                  <Typography variant="h6" fontWeight={700}>
                    User Management
                  </Typography>
                </div>
                <Divider sx={{ borderColor: 'var(--border-glass)', mb: 2 }} />
                <div style={{ overflowX: 'auto' }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        {['ID', 'Username', 'Role', 'Status', 'Logins'].map((h) => (
                          <TableCell
                            key={h}
                            sx={{
                              color: 'var(--text-muted)',
                              fontWeight: 700,
                              fontSize: '0.78rem',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              borderBottom: '1px solid var(--border-glass)',
                            }}
                          >
                            {h}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {MOCK_USERS.map((u) => (
                        <TableRow
                          key={u.id}
                          sx={{
                            '& td': { borderBottom: '1px solid rgba(255,255,255,0.05)' },
                            '&:hover': { background: 'rgba(255,255,255,0.03)' },
                          }}
                        >
                          <TableCell sx={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            {u.id}
                          </TableCell>
                          <TableCell sx={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                            {u.username}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={u.role}
                              size="small"
                              sx={{
                                fontWeight: 700,
                                fontSize: '0.7rem',
                                background: u.role === 'ADMIN'
                                  ? 'rgba(255,107,107,0.15)' : 'rgba(91,141,238,0.15)',
                                color: u.role === 'ADMIN' ? '#ff6b6b' : 'var(--accent-blue)',
                                border: `1px solid ${u.role === 'ADMIN' ? 'rgba(255,107,107,0.3)' : 'rgba(91,141,238,0.3)'}`,
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={u.status}
                              size="small"
                              sx={{
                                fontWeight: 600,
                                fontSize: '0.7rem',
                                background: u.status === 'Active'
                                  ? 'rgba(74,222,128,0.12)' : 'rgba(255,255,255,0.06)',
                                color: u.status === 'Active' ? '#4ade80' : 'var(--text-muted)',
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                            {u.logins}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* ── Snackbar ─────────────────────────────────────────────────────── */}
      <Snackbar
        id="admin-snackbar"
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
