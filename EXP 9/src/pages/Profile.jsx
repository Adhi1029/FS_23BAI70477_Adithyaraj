/**
 * Profile.jsx  |  EXP 9 – RBAC Frontend
 * User profile page visible to all authenticated users.
 */

import React from 'react';
import { Card, CardContent, Typography, Avatar, Divider, Chip } from '@mui/material';
import {
  Person as PersonIcon,
  VpnKey as KeyIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import Navbar from '../components/Navbar';

export default function Profile() {
  const username = sessionStorage.getItem('username') || 'User';
  const role     = sessionStorage.getItem('role') || 'USER';
  const token    = sessionStorage.getItem('token') || '';
  const isAdmin  = role === 'ADMIN';

  // Show only first/last 20 chars of token for display
  const tokenDisplay = token.length > 40
    ? `${token.slice(0, 20)}...${token.slice(-20)}`
    : token || 'Not available';

  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="container py-5 animate-fade-in" style={{ position: 'relative', zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">

            {/* ── Profile Card ─────────────────────────────────────────── */}
            <Card
              id="profile-card"
              sx={{
                background: 'var(--bg-glass)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--border-glass)',
                borderRadius: '20px',
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-glow)',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                {/* Avatar & Name */}
                <div className="text-center mb-4">
                  <Avatar
                    sx={{
                      width: 80, height: 80,
                      fontSize: '2rem', fontWeight: 800,
                      background: isAdmin ? 'var(--gradient-admin)' : 'var(--gradient-accent)',
                      margin: '0 auto 1rem',
                      boxShadow: isAdmin
                        ? '0 8px 24px rgba(255,107,107,0.4)'
                        : '0 8px 24px rgba(91,141,238,0.4)',
                    }}
                  >
                    {username.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="h5" fontWeight={800}>{username}</Typography>
                  <Chip
                    label={isAdmin ? '⚡ ADMIN' : '👤 USER'}
                    size="small"
                    sx={{
                      mt: 1, fontWeight: 700, fontSize: '0.75rem',
                      background: isAdmin ? 'rgba(255,107,107,0.15)' : 'rgba(91,141,238,0.15)',
                      color: isAdmin ? '#ff6b6b' : 'var(--accent-blue)',
                      border: `1px solid ${isAdmin ? 'rgba(255,107,107,0.3)' : 'rgba(91,141,238,0.3)'}`,
                    }}
                  />
                </div>

                <Divider sx={{ borderColor: 'var(--border-glass)', mb: 3 }} />

                {/* Details */}
                {[
                  { icon: <PersonIcon sx={{ fontSize: 18, color: 'var(--accent-blue)' }} />,
                    label: 'Username', value: username },
                  { icon: <SecurityIcon sx={{ fontSize: 18, color: 'var(--accent-purple)' }} />,
                    label: 'Role', value: role },
                  { icon: <SecurityIcon sx={{ fontSize: 18, color: 'var(--accent-cyan)' }} />,
                    label: 'Token Storage', value: 'sessionStorage' },
                  { icon: <KeyIcon sx={{ fontSize: 18, color: '#f7931e' }} />,
                    label: 'JWT Token (truncated)', value: tokenDisplay },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="d-flex align-items-start gap-3 mb-3">
                    <div style={{ marginTop: 2 }}>{icon}</div>
                    <div>
                      <Typography variant="caption" sx={{ color: 'var(--text-muted)', display: 'block' }}>
                        {label}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          wordBreak: 'break-all',
                          fontSize: label.includes('Token') ? '0.75rem' : 'inherit',
                          fontFamily: label.includes('Token') ? 'monospace' : 'inherit',
                        }}
                      >
                        {value}
                      </Typography>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
