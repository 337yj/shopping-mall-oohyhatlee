import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin }: ProtectedRouteProps) => {
  const { user } = useAuthContext();
  const [showAlert, setShowAlert] = useState(false);

  if (!user || (requireAdmin && !user.isAdmin)) {
    if (window.location.pathname === "/carts" && !showAlert) {
      alert("Please login");
    }

    return <Navigate to="/" replace={true} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
