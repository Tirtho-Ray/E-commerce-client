import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;


