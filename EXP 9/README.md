# Experiment 9 – React RBAC Frontend

> **23BAI70477 | Full Stack Development | Experiment 9**
> Role-Based Access Control (RBAC) frontend built with React + Vite, consuming a Spring Boot JWT backend.

---

## Table of Contents
1. [Objectives](#objectives)
2. [Technologies Used](#technologies-used)
3. [Architecture Overview](#architecture-overview)
4. [Features Implemented](#features-implemented)
5. [Project Structure](#project-structure)
6. [Setup Instructions](#setup-instructions)
7. [API Contract](#api-contract)
8. [Screenshots](#screenshots)
9. [RBAC Flow Explained](#rbac-flow-explained)
10. [Key Code Snippets](#key-code-snippets)

---

## Objectives

1. Understand and implement **Role-Based Access Control** on the frontend.
2. Build a production-grade React SPA that consumes a Spring Boot REST API.
3. Use **JWT tokens** stored in `sessionStorage` for stateless authentication.
4. Implement **protected and admin-only routes** using React Router DOM v6.
5. Demonstrate **component-level role hiding** (Admin Panel link only visible to ADMIN).
6. Handle **403 Forbidden** responses gracefully with MUI Snackbar alerts.
7. Apply modern UI/UX principles using **Material UI** and **Bootstrap**.

---

## Technologies Used

| Category       | Technology / Library          | Version  | Purpose                                  |
|----------------|-------------------------------|----------|------------------------------------------|
| Frontend       | React                         | 18.x     | Component-based UI                       |
| Bundler        | Vite                          | 6.x      | Fast dev server & build tool             |
| Routing        | React Router DOM              | 6.x      | SPA routing & route guards               |
| UI Library     | Material UI (MUI)             | 6.x      | Polished UI components                   |
| CSS Framework  | Bootstrap                     | 5.x      | Responsive grid & layout utilities       |
| HTTP Client    | Axios                         | 1.x      | API calls with request/response intercept|
| Auth Storage   | `sessionStorage` (Web API)    | —        | Persists JWT token and user role         |
| Icons          | @mui/icons-material           | 6.x      | Material Design icons                    |
| Backend        | Spring Boot + Spring Security | 3.x      | REST API with JWT-based RBAC             |
| Auth Scheme    | JWT (Bearer Token)            | —        | Stateless authentication                 |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    React SPA (Vite)                     │
│                                                         │
│  ┌──────────┐   ┌─────────────────────────────────┐    │
│  │  Login   │   │         App Router               │    │
│  │  /login  │   │  / → /login (default)            │    │
│  └────┬─────┘   │  /user-dashboard  [ProtectedRoute]│   │
│       │         │  /admin-dashboard [AdminRoute]    │    │
│       │ POST    │  /profile         [ProtectedRoute]│    │
│       ▼         │  /unauthorized    (public)        │    │
│  ┌──────────────────────────────────────────────┐  │    │
│  │           axiosConfig.js (Axios Instance)    │  │    │
│  │  Request Interceptor: Attach Bearer Token    │  │    │
│  │  Response Interceptor: Handle 401 / 403      │  │    │
│  └─────────────────┬────────────────────────────┘  │    │
└────────────────────┼────────────────────────────────┘    
                     │ HTTP (localhost:5000)
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Spring Boot Backend                        │
│  POST /login          → { token, role }                 │
│  GET  /api/user/dashboard  [role: USER or ADMIN]        │
│  GET  /api/admin/dashboard [role: ADMIN only → 403]     │
└─────────────────────────────────────────────────────────┘
```

**sessionStorage after login:**
```
sessionStorage {
  token:    "eyJhbGciOiJIUzI1NiJ9...",
  role:     "ADMIN" | "USER",
  username: "admin" | "alice"
}
```

---

## Features Implemented

### ✅ Authentication
- [x] Login form with username / password using **MUI TextField** components
- [x] Password visibility toggle
- [x] POST to `/login` with Axios; stores `token`, `role`, `username` in `sessionStorage`
- [x] Role-based redirect: `ADMIN → /admin-dashboard`, `USER → /user-dashboard`
- [x] Error alert displayed on failed login

### ✅ Route Protection
- [x] `ProtectedRoute` – redirects unauthenticated users to `/login`
- [x] `AdminRoute` – redirects non-ADMIN users to `/unauthorized`
- [x] Clean 403 Unauthorized page with RBAC explanation

### ✅ Axios Interceptors
- [x] Request interceptor auto-attaches `Authorization: Bearer <token>`
- [x] Response interceptor: `401 → clear session + redirect to /login`
- [x] `403` re-thrown for per-component Snackbar handling

### ✅ Role-Based UI
- [x] **Navbar** shows "Admin Panel" link ONLY for ADMIN role
- [x] Role badge chip (ADMIN in red, USER in blue) in navbar
- [x] Component-level conditional rendering based on `sessionStorage.getItem('role')`

### ✅ Dashboards
- [x] **User Dashboard** – Stat cards, API response card, permissions list, 403-demo button
- [x] **Admin Dashboard** – Stat grid, admin API card, RBAC config, User Management table
- [x] **Profile Page** – Shows username, role, and truncated JWT token

### ✅ Error Handling
- [x] MUI `<Snackbar>` + `<Alert>` for "Access Denied: Insufficient Permissions" on 403
- [x] Graceful fallback mock data if backend is offline
- [x] Loading skeletons and `<LinearProgress>` while fetching

---

## Project Structure

```
EXP 9/
├── index.html
├── vite.config.js
├── eslint.config.js
├── package.json
├── .gitignore
├── README.md
└── src/
    ├── main.jsx                      ← Entry point; imports Bootstrap CSS
    ├── App.jsx                       ← Root router + MUI ThemeProvider
    ├── index.css                     ← Global design tokens, glassmorphism, animations
    │
    ├── api/
    │   └── axiosConfig.js            ← Axios instance + request/response interceptors
    │
    ├── components/
    │   ├── Navbar.jsx                ← Sticky navbar with role-based link visibility
    │   └── ProtectedRoutes.jsx       ← ProtectedRoute + AdminRoute guard components
    │
    └── pages/
        ├── Login.jsx                 ← MUI login form, role-based redirect
        ├── UserDashboard.jsx         ← User page + 403 demo
        ├── AdminDashboard.jsx        ← Admin-only page + user table
        ├── Profile.jsx               ← JWT & role display
        └── Unauthorized.jsx          ← 403 forbidden page
```

---

## Setup Instructions

### Prerequisites
- Node.js ≥ 18
- Spring Boot backend running on `http://localhost:5000`

### 1. Initialize with Vite (one-time setup)
```bash
npm create vite@latest exp-9-rbac-frontend -- --template react
cd exp-9-rbac-frontend
```

### 2. Install Dependencies
```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled \
            react-router-dom axios bootstrap
```

### 3. Run the Development Server
```bash
npm run dev
```
The app will be available at **http://localhost:5173**

### 4. Build for Production
```bash
npm run build
```

---

## API Contract

The frontend expects the following API endpoints on `http://localhost:5000`:

### `POST /login`
**Request body:**
```json
{ "username": "admin", "password": "admin" }
```
**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "role":  "ADMIN"
}
```

### `GET /api/user/dashboard`
- **Roles allowed:** USER, ADMIN
- **Header:** `Authorization: Bearer <token>`
- **200 Response:** dashboard data JSON
- **403 Response:** if role is insufficient

### `GET /api/admin/dashboard`
- **Roles allowed:** ADMIN only
- **Header:** `Authorization: Bearer <token>`
- **200 Response:** admin dashboard data JSON
- **403 Response:** returned for USER role → triggers Snackbar alert

---

## Screenshots

> **Instructions:** Run the application and capture the following screenshots. Replace each placeholder below.

---

### Screenshot 1 – Login UI

*Paste screenshot of the login page here.*

```
[ SCREENSHOT 1: Login page UI ]
- Shows the glassmorphism login card, username/password fields, and Sign In button.
- URL: http://localhost:5173/login
```

---

### Screenshot 2 – USER Accessing User Endpoint

*Paste screenshot here.*

```
[ SCREENSHOT 2: User Dashboard ]
- Shows the user dashboard after successful USER login.
- The Navbar shows "My Dashboard" and "User Profile" links but NO "Admin Panel" link.
- The dashboard card shows the response from GET /api/user/dashboard.
- Role badge shows "👤 USER".
```

---

### Screenshot 3 – USER Denied Access to Admin Endpoint (403 Handling)

*Paste screenshot here.*

```
[ SCREENSHOT 3: 403 Forbidden – Snackbar Alert ]
- Shows the User Dashboard with the MUI Snackbar/Alert at the bottom saying:
  "Access Denied: Insufficient Permissions"
- This appears after clicking the "Try Admin Endpoint (triggers 403)" button.
- Demonstrates that a USER cannot access /api/admin/dashboard.
```

---

### Screenshot 4 – ADMIN Accessing Admin Endpoint

*Paste screenshot here.*

```
[ SCREENSHOT 4: Admin Dashboard ]
- Shows the admin dashboard after successful ADMIN login.
- The Navbar shows "My Dashboard", "User Profile", AND "Admin Panel" links.
- Stat cards show Total Users, Active Users, Pending Alerts, System Status.
- The User Management table is visible.
- Role badge shows "⚡ ADMIN".
```

---

### Screenshot 5 – sessionStorage Showing Role and Token

*Paste screenshot here.*

```
[ SCREENSHOT 5: Browser DevTools → Application → sessionStorage ]
- Open DevTools (F12) → Application tab → Local Storage / Session Storage
- → http://localhost:5173
- Shows three keys: token (JWT string), role (ADMIN or USER), username
- Demonstrates that auth state is stored in sessionStorage as required.
```

---

### Screenshot 6 – Unauthorized Access Handling (Redirect or Snackbar)

*Paste screenshot here.*

```
[ SCREENSHOT 6: Unauthorized Page or Route Redirect ]
Option A – Route Guard redirect:
  - Log in as USER, navigate to http://localhost:5173/admin-dashboard in browser.
  - Shows the 403 Unauthorized page ("Forbidden – You do not have permission").
  
Option B – Snackbar alert:
  - Shows the Snackbar at bottom: "Access Denied: Insufficient Permissions"
  - When a USER clicks the 403-demo button on their dashboard.
```

---

## RBAC Flow Explained

```
User enters credentials → POST /login
         │
         ▼
   Backend validates → returns { token, role }
         │
         ▼
   sessionStorage.setItem('token', ...) 
   sessionStorage.setItem('role',  ...)
         │
    ┌────┴────────────────────┐
    │ role === 'ADMIN'?       │
    │                         │
   YES                        NO
    │                         │
    ▼                         ▼
/admin-dashboard         /user-dashboard
 (AdminRoute)            (ProtectedRoute)
    │
    │ Axios request → GET /api/admin/dashboard
    │   Authorization: Bearer <token>
    │
    ▼
Backend checks role from JWT payload:
  ✅ ADMIN → 200 OK + data
  ❌ USER  → 403 Forbidden → MUI Snackbar "Access Denied"
```

---

## Key Code Snippets

### Axios Request Interceptor (auto-attach JWT)
```javascript
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});
```

### AdminRoute Guard
```javascript
export function AdminRoute() {
  const token = sessionStorage.getItem('token');
  const role  = sessionStorage.getItem('role');
  if (!token) return <Navigate to="/login" replace />;
  if (role !== 'ADMIN') return <Navigate to="/unauthorized" replace />;
  return <Outlet />;
}
```

### 403 Snackbar trigger
```javascript
} catch (err) {
  if (err.response?.status === 403) {
    showSnack('Access Denied: Insufficient Permissions');
  }
}
```

---

*End of README – Experiment 9 | 23BAI70477*
