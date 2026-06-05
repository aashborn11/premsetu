/**
 * PaidRoute — route guard for paid members only.
 *
 * Not logged in  → /login
 * Logged in, not paid → /membership
 * Logged in, paid → renders children
 *
 * Only wraps /matches. ViewProfile handles its own gate (own-profile
 * exception needs to know the profile id).
 */

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PaidRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="page-loader">Loading your account...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isPaid) {
    return <Navigate to="/membership" replace />;
  }

  return children;
};

export default PaidRoute;
