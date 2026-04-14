/**
 * Login.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Login page for Experiment 8 – React JWT Authentication Frontend.
 *
 * Responsibilities:
 *  • Renders a centered MUI Card form (Bootstrap grid for centering).
 *  • Accepts username & password from the user.
 *  • Calls POST http://localhost:5000/login via the shared Axios instance.
 *  • On success → stores the JWT in sessionStorage → redirects to /dashboard.
 *  • On failure → displays an MUI Snackbar / Alert with the error message.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

// MUI Components
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import {
  LockOutlined,
  PersonOutlined,
  Visibility,
  VisibilityOff,
  LoginRounded,
  SecurityRounded,
} from "@mui/icons-material";

// Axios instance (auto-attaches token header when present)
import api from "../api/axiosConfig";

// ── Inline style constants ───────────────────────────────────────────────────
const pageStyles = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a1a2e 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "'Inter', sans-serif",
  position: "relative",
  overflow: "hidden",
};

const cardStyles = {
  width: "100%",
  maxWidth: 450,
  borderRadius: "20px",
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
  color: "#fff",
  position: "relative",
  zIndex: 10,
};

const inputSx = {
  mb: 2.5,
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.5)" },
    "&.Mui-focused fieldset": { borderColor: "#7c4dff" },
  },
  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.6)" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#a78bfa" },
  "& .MuiInputAdornment-root .MuiSvgIcon-root": { color: "rgba(255,255,255,0.5)" },
};

// ── Component ────────────────────────────────────────────────────────────────
const Login = () => {
  const navigate = useNavigate();

  // If already authenticated, skip the login page
  if (sessionStorage.getItem("token")) {
    return <Navigate to="/dashboard" replace />;
  }

  // ── Local State ────────────────────────────────────────────────────────────
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "error" });

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!form.username.trim() || !form.password.trim()) {
      setSnack({ open: true, message: "Username and password are required.", severity: "warning" });
      return;
    }

    setLoading(true);
    try {
      // POST /login → { token: "..." }
      const response = await api.post("/login", {
        username: form.username.trim(),
        password: form.password,
      });

      const { token } = response.data;

      if (!token) throw new Error("No token received from server.");

      // ── Store in sessionStorage (strict requirement) ────────────────────
      sessionStorage.setItem("token", token);

      setSnack({ open: true, message: "Login successful! Redirecting…", severity: "success" });
      setTimeout(() => navigate("/dashboard"), 800);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "Login failed. Please check your credentials.";
      setSnack({ open: true, message: String(msg), severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <Box sx={pageStyles}>
      {/* Decorative background blobs */}
      <Box sx={{
        position: "absolute", width: 400, height: 400,
        background: "radial-gradient(circle, rgba(124,77,255,0.25) 0%, transparent 70%)",
        top: "-80px", left: "-100px", borderRadius: "50%", zIndex: 1,
      }} />
      <Box sx={{
        position: "absolute", width: 350, height: 350,
        background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)",
        bottom: "-60px", right: "-80px", borderRadius: "50%", zIndex: 1,
      }} />

      {/* ── Main Card ────────────────────────────────────────────────────── */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-11 col-sm-9 col-md-7 col-lg-5">
            <Card sx={cardStyles} elevation={0}>
              <CardContent sx={{ p: 5 }}>

                {/* Header */}
                <Box sx={{ textAlign: "center", mb: 4 }}>
                  <Box sx={{
                    display: "inline-flex", p: 2,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #7c4dff 0%, #00e5ff 100%)",
                    mb: 2, boxShadow: "0 8px 24px rgba(124,77,255,0.4)",
                  }}>
                    <SecurityRounded sx={{ fontSize: 36, color: "#fff" }} />
                  </Box>
                  <Typography variant="h4" fontWeight={700} sx={{ color: "#fff", letterSpacing: "-0.5px" }}>
                    Welcome Back
                  </Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", mt: 0.5 }}>
                    Sign in to access the protected dashboard
                  </Typography>
                </Box>

                <Divider sx={{ mb: 3.5, borderColor: "rgba(255,255,255,0.1)" }} />

                {/* Form */}
                <Box component="form" onSubmit={handleSubmit} noValidate id="login-form">
                  <TextField
                    id="username-input"
                    label="Username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    fullWidth
                    autoComplete="username"
                    autoFocus
                    sx={inputSx}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlined />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    id="password-input"
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    fullWidth
                    autoComplete="current-password"
                    sx={inputSx}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlined />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            id="toggle-password-visibility"
                            onClick={() => setShowPassword((v) => !v)}
                            edge="end"
                            size="small"
                            sx={{ color: "rgba(255,255,255,0.5)" }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    id="login-submit-btn"
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginRounded />}
                    sx={{
                      mt: 1, py: 1.5, borderRadius: "12px", fontWeight: 700,
                      fontSize: "1rem", textTransform: "none", letterSpacing: "0.3px",
                      background: "linear-gradient(135deg, #7c4dff 0%, #00e5ff 100%)",
                      boxShadow: "0 8px 24px rgba(124,77,255,0.4)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 12px 32px rgba(124,77,255,0.55)",
                      },
                      "&:active": { transform: "translateY(0)" },
                    }}
                  >
                    {loading ? "Signing in…" : "Sign In"}
                  </Button>
                </Box>

                {/* Footer hint */}
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.35)", display: "block", textAlign: "center", mt: 3 }}>
                  Experiment 8 · Full Stack Development · 23BAI70477
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* ── Snackbar Feedback ──────────────────────────────────────────────── */}
      <Snackbar
        id="login-snackbar"
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          id="login-alert"
          severity={snack.severity}
          variant="filled"
          sx={{ borderRadius: "12px", fontWeight: 600 }}
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
