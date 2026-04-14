/**
 * ProtectedRoute.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * A Higher-Order Route wrapper that guards routes behind JWT authentication.
 *
 * How it works:
 *  1. Checks whether a "token" key exists in sessionStorage.
 *  2. If token exists  → renders the child route/component.
 *  3. If token is absent → redirects the user to /login.
 *
 * Usage inside App.jsx:
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/dashboard" element={<Dashboard />} />
 *   </Route>
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = sessionStorage.getItem("token");

  // If no token is found, send the user to the login page.
  // `replace` prevents them from going back to the protected URL via the
  // browser's back button.
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
