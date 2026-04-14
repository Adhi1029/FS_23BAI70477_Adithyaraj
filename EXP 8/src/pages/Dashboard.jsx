/**
 * Dashboard.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Protected Dashboard page for Experiment 8 – React JWT Authentication Frontend.
 *
 * Responsibilities:
 *  • Mounts only when a valid JWT exists (guarded by ProtectedRoute).
 *  • On mount → calls GET http://localhost:5000/protected (token auto-attached
 *    by the Axios interceptor in axiosConfig.js).
 *  • Displays the API response inside a premium MUI Card layout.
 *  • Provides a Logout button that clears sessionStorage and redirects to /login.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI Components
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Divider,
  Skeleton,
  Alert,
  Avatar,
  Grid,
  Paper,
} from "@mui/material";
import {
  LogoutRounded,
  ShieldRounded,
  CheckCircleRounded,
  TokenRounded,
  LockOpenRounded,
  DashboardRounded,
  InfoRounded,
} from "@mui/icons-material";

// Axios instance
import api from "../api/axiosConfig";

// ── Style helpers ─────────────────────────────────────────────────────────────
const pageStyles = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a1a2e 100%)",
  fontFamily: "'Inter', sans-serif",
  py: 5,
  px: 2,
  position: "relative",
  overflow: "hidden",
};

const cardGlass = {
  borderRadius: "20px",
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
  color: "#fff",
};

// ── Helper: decode JWT payload (without library) ──────────────────────────────
const decodeTokenPayload = (token) => {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
};

// ── Component ─────────────────────────────────────────────────────────────────
const Dashboard = () => {
  const navigate = useNavigate();

  // ── State ──────────────────────────────────────────────────────────────────
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = sessionStorage.getItem("token");
  const payload = token ? decodeTokenPayload(token) : null;
  const username = payload?.sub || payload?.username || payload?.name || "User";

  // ── Fetch protected data on mount ──────────────────────────────────────────
  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        // Authorization header is auto-injected by the Axios interceptor
        const response = await api.get("/protected");
        setApiData(response.data);
      } catch (err) {
        const msg =
          err.response?.data?.message ||
          err.response?.data ||
          err.message ||
          "Failed to fetch protected data.";
        setError(String(msg));
      } finally {
        setLoading(false);
      }
    };

    fetchProtectedData();
  }, []);

  // ── Logout handler ─────────────────────────────────────────────────────────
  const handleLogout = () => {
    sessionStorage.removeItem("token"); // clear stored JWT
    navigate("/login", { replace: true });
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <Box sx={pageStyles}>
      {/* Decorative blobs */}
      <Box sx={{
        position: "absolute", width: 500, height: 500,
        background: "radial-gradient(circle, rgba(124,77,255,0.2) 0%, transparent 70%)",
        top: "-120px", left: "-150px", borderRadius: "50%", zIndex: 1,
      }} />
      <Box sx={{
        position: "absolute", width: 400, height: 400,
        background: "radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%)",
        bottom: "-80px", right: "-100px", borderRadius: "50%", zIndex: 1,
      }} />

      <Box sx={{ position: "relative", zIndex: 10 }}>
        <div className="container">

          {/* ── Top Navigation Bar ─────────────────────────────────────────── */}
          <Box sx={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            mb: 4, flexWrap: "wrap", gap: 2,
          }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{
                background: "linear-gradient(135deg, #7c4dff 0%, #00e5ff 100%)",
                width: 48, height: 48, boxShadow: "0 4px 16px rgba(124,77,255,0.4)",
              }}>
                <DashboardRounded />
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight={700} sx={{ color: "#fff", lineHeight: 1.2 }}>
                  Dashboard
                </Typography>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
                  Welcome back, <strong style={{ color: "#a78bfa" }}>{username}</strong>
                </Typography>
              </Box>
            </Box>

            <Button
              id="logout-btn"
              variant="outlined"
              startIcon={<LogoutRounded />}
              onClick={handleLogout}
              sx={{
                borderRadius: "12px", borderColor: "rgba(255,255,255,0.2)", color: "#fff",
                textTransform: "none", fontWeight: 600, px: 3, py: 1,
                backdropFilter: "blur(10px)", background: "rgba(255,255,255,0.05)",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "#ef4444", color: "#ef4444",
                  background: "rgba(239,68,68,0.1)", transform: "translateY(-1px)",
                },
              }}
            >
              Logout
            </Button>
          </Box>

          {/* ── Status Chips Row ────────────────────────────────────────────── */}
          <Box sx={{ display: "flex", gap: 1.5, mb: 4, flexWrap: "wrap" }}>
            <Chip
              id="chip-authenticated"
              icon={<CheckCircleRounded />}
              label="Authenticated"
              size="small"
              sx={{
                background: "rgba(34,197,94,0.15)", color: "#4ade80",
                borderColor: "rgba(34,197,94,0.3)", border: "1px solid",
                fontWeight: 600,
              }}
            />
            <Chip
              id="chip-jwt-active"
              icon={<TokenRounded />}
              label="JWT Active"
              size="small"
              sx={{
                background: "rgba(124,77,255,0.15)", color: "#a78bfa",
                borderColor: "rgba(124,77,255,0.3)", border: "1px solid",
                fontWeight: 600,
              }}
            />
            <Chip
              id="chip-protected-route"
              icon={<LockOpenRounded />}
              label="Protected Route"
              size="small"
              sx={{
                background: "rgba(0,229,255,0.1)", color: "#67e8f9",
                borderColor: "rgba(0,229,255,0.3)", border: "1px solid",
                fontWeight: 600,
              }}
            />
          </Box>

          <div className="row g-4">

            {/* ── LEFT: Protected API Response Card ─────────────────────────── */}
            <div className="col-12 col-lg-7">
              <Card sx={cardGlass} elevation={0}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                    <Box sx={{
                      p: 1.2, borderRadius: "10px",
                      background: "linear-gradient(135deg, #7c4dff 0%, #00e5ff 100%)",
                    }}>
                      <ShieldRounded sx={{ color: "#fff", fontSize: 22 }} />
                    </Box>
                    <Typography variant="h6" fontWeight={700} sx={{ color: "#fff" }}>
                      Protected API Response
                    </Typography>
                  </Box>

                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", mb: 2, display: "block" }}>
                    GET &nbsp;<code style={{ color: "#a78bfa" }}>http://localhost:5000/protected</code>
                  </Typography>

                  <Divider sx={{ mb: 3, borderColor: "rgba(255,255,255,0.08)" }} />

                  {/* Loading skeleton */}
                  {loading && (
                    <Box id="dashboard-loading">
                      <Skeleton variant="text" sx={{ bgcolor: "rgba(255,255,255,0.08)", borderRadius: 2 }} height={28} />
                      <Skeleton variant="text" sx={{ bgcolor: "rgba(255,255,255,0.08)", borderRadius: 2 }} height={28} width="80%" />
                      <Skeleton variant="rectangular" sx={{ bgcolor: "rgba(255,255,255,0.05)", borderRadius: 2, mt: 1 }} height={80} />
                    </Box>
                  )}

                  {/* Error state */}
                  {!loading && error && (
                    <Alert
                      id="dashboard-error-alert"
                      severity="error"
                      variant="filled"
                      sx={{ borderRadius: "12px" }}
                    >
                      {error}
                    </Alert>
                  )}

                  {/* Success state: display API data */}
                  {!loading && !error && apiData && (
                    <Box id="protected-data-display">
                      <Paper sx={{
                        background: "rgba(0,0,0,0.3)", borderRadius: "12px",
                        p: 2.5, border: "1px solid rgba(255,255,255,0.08)",
                      }}>
                        <Typography variant="caption" sx={{ color: "#4ade80", fontWeight: 700, letterSpacing: "0.05em" }}>
                          ✓ &nbsp;200 OK — Data received successfully
                        </Typography>
                        <Box
                          component="pre"
                          id="api-response-json"
                          sx={{
                            mt: 1.5, mb: 0, color: "#e2e8f0", fontFamily: "'Fira Code', monospace",
                            fontSize: "0.82rem", overflowX: "auto", whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                          }}
                        >
                          {typeof apiData === "object"
                            ? JSON.stringify(apiData, null, 2)
                            : String(apiData)}
                        </Box>
                      </Paper>
                    </Box>
                  )}

                  {/* Empty state */}
                  {!loading && !error && !apiData && (
                    <Typography sx={{ color: "rgba(255,255,255,0.4)" }}>
                      No data returned from the API.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* ── RIGHT: Token Info Card ─────────────────────────────────────── */}
            <div className="col-12 col-lg-5">
              <Card sx={cardGlass} elevation={0}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                    <Box sx={{
                      p: 1.2, borderRadius: "10px",
                      background: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
                    }}>
                      <TokenRounded sx={{ color: "#fff", fontSize: 22 }} />
                    </Box>
                    <Typography variant="h6" fontWeight={700} sx={{ color: "#fff" }}>
                      Token & Session Info
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 3, borderColor: "rgba(255,255,255,0.08)" }} />

                  {/* Token payload fields */}
                  {payload &&
                    Object.entries(payload).map(([key, value]) => (
                      <Box key={key} sx={{ mb: 2 }}>
                        <Typography variant="caption" sx={{
                          color: "rgba(255,255,255,0.4)", textTransform: "uppercase",
                          letterSpacing: "0.08em", fontWeight: 700,
                        }}>
                          {key}
                        </Typography>
                        <Typography variant="body2" sx={{
                          color: "#e2e8f0", fontFamily: "'Fira Code', monospace",
                          fontSize: "0.82rem", wordBreak: "break-all",
                          background: "rgba(0,0,0,0.25)", borderRadius: "8px",
                          px: 1.5, py: 0.8, mt: 0.4, display: "block",
                        }}>
                          {key === "exp" || key === "iat"
                            ? `${value} (${new Date(value * 1000).toLocaleString()})`
                            : String(value)}
                        </Typography>
                      </Box>
                    ))}

                  {!payload && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <InfoRounded sx={{ color: "rgba(255,255,255,0.4)", fontSize: 18 }} />
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.4)" }}>
                        Could not decode token payload.
                      </Typography>
                    </Box>
                  )}

                  {/* Storage indicator */}
                  <Divider sx={{ my: 2.5, borderColor: "rgba(255,255,255,0.08)" }} />
                  <Box sx={{
                    display: "flex", alignItems: "center", gap: 1.5,
                    background: "rgba(34,197,94,0.08)", borderRadius: "10px",
                    px: 2, py: 1.5, border: "1px solid rgba(34,197,94,0.2)",
                  }}>
                    <CheckCircleRounded sx={{ color: "#4ade80", fontSize: 18 }} />
                    <Typography variant="caption" sx={{ color: "#4ade80", fontWeight: 600 }}>
                      Token persisted in <strong>sessionStorage</strong>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Footer */}
          <Typography variant="caption" sx={{
            color: "rgba(255,255,255,0.25)", display: "block",
            textAlign: "center", mt: 5,
          }}>
            Experiment 8 · Full Stack Development · 23BAI70477
          </Typography>
        </div>
      </Box>
    </Box>
  );
};

export default Dashboard;
