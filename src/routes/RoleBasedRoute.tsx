import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { decodeToken, getToken, isTokenExpired } from "../utils/token/tokenUtils";

interface RoleBasedRouteProps {
    allowedRoles: string[]; // ex: ["ADMIN", "SUPER_ADMIN"]
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ allowedRoles }) => {
    const location = useLocation();

    const token = getToken();


    if (!token || isTokenExpired(token)) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }


    const decoded = decodeToken(token) as { role?: string } | null;
    if (!decoded || !decoded.role || !allowedRoles.includes(decoded.role)) {
        return <Navigate to="/request-seller" replace />;
    }
    return <Outlet />;
}
export default RoleBasedRoute;