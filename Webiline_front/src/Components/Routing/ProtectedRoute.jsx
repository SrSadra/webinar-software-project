import React from "react";
import { getUser } from "../../services/userServices";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
    const location = useLocation();

    return getUser() ? (
        <Outlet />
    ) : (
        <Navigate to='/login' state={{ from: location.pathname }} />
    );
};

export default ProtectedRoute;
