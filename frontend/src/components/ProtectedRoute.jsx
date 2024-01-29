import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    // If there is no logged in user, redirect to login page
    return <Navigate to="/login" replace />;
  }

  return children;
};
