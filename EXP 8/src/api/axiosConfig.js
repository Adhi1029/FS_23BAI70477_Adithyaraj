/**
 * axiosConfig.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralised Axios instance for all HTTP requests.
 * An Axios request interceptor automatically reads the JWT from sessionStorage
 * and attaches it as `Authorization: Bearer <token>` on every outgoing call.
 *
 * Backend base URL: http://localhost:5000
 * ─────────────────────────────────────────────────────────────────────────────
 */

import axios from "axios";

// ── 1. Create a named Axios instance ────────────────────────────────────────
const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10-second request timeout
});

// ── 2. Request Interceptor ───────────────────────────────────────────────────
// Runs before every request.  If a token is present in sessionStorage it is
// automatically injected into the Authorization header.
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── 3. Response Interceptor ──────────────────────────────────────────────────
// Handles global error scenarios.  On a 401 (token expired / invalid) the
// user is automatically cleared and redirected back to /login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
