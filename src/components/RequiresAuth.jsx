import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export const RequiresAuth = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
