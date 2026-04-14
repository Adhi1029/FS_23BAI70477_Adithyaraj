/**
 * Login.jsx  |  EXP 9 – RBAC Frontend
 * ─────────────────────────────────────────────────────────────────────────────
 * Centered MUI login form using Bootstrap 12-col grid.
 *
 * On success:
 *  • Stores `token`, `role`, and `username` in sessionStorage.
 *  • Redirects ADMIN → /admin-dashboard, USER → /user-dashboard.
 *
 * On failure:
 *  • Displays an MUI Alert with the error message.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Lock as LockIcon,
  Person as PersonIcon,
  Visibility,
  VisibilityOff,
  Shield as ShieldIcon,
  Login as LoginIcon,
} from '@mui/icons-material';
import api from '../api/axiosConfig';

export default function Login() {
  const navigate              = useNavigate();
  const [form, setForm]       = useState({ username: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      /**
       * POST /login  →  { token: string, role: "ADMIN" | "USER" }
       * The Spring Boot backend is expected to return these two fields.
       */
      const { data } = await api.post('/login', {
        username: form.username.trim(),
        password: form.password,
      });

      // ── Persist auth state in sessionStorage ──────────────────────────
      sessionStorage.setItem('token',    data.token);
      sessionStorage.setItem('role',     data.role);
      sessionStorage.setItem('username', form.username.trim());

      // ── Role-based redirect ───────────────────────────────────────────
      if (data.role === 'ADMIN') {
        navigate('/admin-dashboard', { replace: true });
      } else {
        navigate('/user-dashboard', { replace: true });
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data ||
        'Login failed. Please check your credentials.';
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  };

  // ── Shared MUI sx styles ────────────────────────────────────────────────
  const inputSx = {
    '& .MuiOutlinedInput-root': {
      color: 'var(--text-primary)',
      background: 'rgba(255,255,255,0.05)',
      borderRadius: '10px',
      '& fieldset': { borderColor: 'var(--border-glass)' },
      '&:hover fieldset': { borderColor: 'var(--accent-blue)' },
      '&.Mui-focused fieldset': { borderColor: 'var(--accent-blue)' },
    },
    '& .MuiInputLabel-root': {
      color: 'var(--text-muted)',
      '&.Mui-focused': { color: 'var(--accent-blue)' },
    },
    '& .MuiInputAdornment-root .MuiSvgIcon-root': { color: 'var(--text-muted)' },
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh', padding: '1.5rem', position: 'relative', zIndex: 1 }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">

            {/* ── Glass Card ─────────────────────────────────────────────── */}
            <div className="glass-card p-4 p-md-5 animate-slide-up">

              {/* Header */}
              <div className="text-center mb-4">
                <div
                  style={{
                    width: 64, height: 64,
                    background: 'var(--gradient-accent)',
                    borderRadius: 16,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1rem',
                    boxShadow: '0 8px 24px rgba(91,141,238,0.4)',
                    animation: 'pulse-glow 3s ease-in-out infinite',
                  }}
                >
                  <ShieldIcon sx={{ fontSize: 32, color: '#fff' }} />
                </div>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 4 }}>
                  Secure Login
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Role-Based Access Control System
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: 4 }}>
                  EXP 9 &nbsp;|&nbsp; 23BAI70477
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <Alert
                  id="login-error-alert"
                  severity="error"
                  variant="filled"
                  sx={{
                    mb: 2.5,
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    background: 'rgba(211,47,47,0.85)',
                  }}
                >
                  {error}
                </Alert>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} noValidate>
                <div className="d-flex flex-column gap-3">

                  {/* Username */}
                  <TextField
                    id="login-username"
                    label="Username"
                    name="username"
                    type="text"
                    value={form.username}
                    onChange={handleChange}
                    required
                    fullWidth
                    autoComplete="username"
                    autoFocus
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={inputSx}
                  />

                  {/* Password */}
                  <TextField
                    id="login-password"
                    label="Password"
                    name="password"
                    type={showPwd ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    required
                    fullWidth
                    autoComplete="current-password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            id="toggle-password-visibility"
                            onClick={() => setShowPwd((s) => !s)}
                            edge="end"
                            size="small"
                            sx={{ color: 'var(--text-muted)' }}
                          >
                            {showPwd ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={inputSx}
                  />

                  {/* Submit */}
                  <Button
                    id="login-submit-btn"
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    startIcon={loading ? null : <LoginIcon />}
                    sx={{
                      mt: 1,
                      py: 1.4,
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      letterSpacing: '0.5px',
                      background: 'var(--gradient-accent)',
                      boxShadow: '0 4px 20px rgba(91,141,238,0.4)',
                      textTransform: 'none',
                      transition: 'all 0.25s',
                      '&:hover': {
                        filter: 'brightness(1.15)',
                        boxShadow: '0 8px 28px rgba(91,141,238,0.55)',
                      },
                      '&:disabled': { opacity: 0.6 },
                    }}
                  >
                    {loading ? <CircularProgress size={22} color="inherit" /> : 'Sign In'}
                  </Button>
                </div>
              </form>

              {/* Hint */}
              <div className="text-center mt-4">
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  Demo credentials: &nbsp;
                  <code style={{ color: 'var(--accent-cyan)' }}>admin / admin</code>
                  &nbsp; or &nbsp;
                  <code style={{ color: 'var(--accent-blue)' }}>user / user</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
