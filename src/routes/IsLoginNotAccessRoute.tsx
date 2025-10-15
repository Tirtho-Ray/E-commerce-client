import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";


const IsLoginNotAccessRoute: React.FC = () => {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default IsLoginNotAccessRoute;
