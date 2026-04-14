/**
 * axiosConfig.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralised Axios instance for EXP 9 – RBAC Frontend.
 *
 * Features:
 *  • Base URL points to the Spring Boot backend (http://localhost:5000)
 *  • Request interceptor: reads JWT from sessionStorage and injects the
 *    `Authorization: Bearer <token>` header automatically.
 *  • Response interceptor:
 *    – 401 → clears session + redirects to /login
 *    – 403 → re-throws so individual components can show the Snackbar alert
 * ─────────────────────────────────────────────────────────────────────────────
 */

import axios from 'axios';

// ── 1. Named Axios instance ─────────────────────────────────────────────────
const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' },
  timeout: 12000, // 12-second request timeout
});

// ── 2. Request Interceptor – auto-attach JWT ────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── 3. Response Interceptor – global error handling ─────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Token expired or invalid → clear session and force re-login
      sessionStorage.clear();
      window.location.href = '/login';
    }

    // 403 is re-thrown so pages can display a context-aware MUI Snackbar
    return Promise.reject(error);
  }
);

export default api;
