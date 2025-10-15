import { createBrowserRouter } from "react-router";
import MainLayout from "../mainLayout/MainLayout";
import MainHomePage from "../pages/home/MainHome";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyOtp from "../pages/auth/VerifyOtp";
import RequestSeller from "../pages/sellerReq/RequestSeller";
import SellerFrom from "../pages/sellerReq/SellerFrom";
import UserDashBoard from "../pages/DashBoard/UserDashBoard/UserDashBoard";
import AdminDashBoard from "../pages/DashBoard/AdminDashBoard/AdminDashBoard";
import ProtectedRoute from "../routes/ProtectedRoute";
import RoleBasedRoute from "../routes/RoleBasedRoute";





export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <MainHomePage />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/verify-otp",
                element: <VerifyOtp />
            },
            {
                path: "/request-seller",
                element: <RequestSeller />
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/request-seller-form",
                        element: <SellerFrom />
                    }
                ]
            },
            {
                path: "/user-dashboard",
                element: <UserDashBoard />
            },
            {
                element: <RoleBasedRoute allowedRoles={["ADMIN"]} />,
                children: [
                    { path: "/admin-dashboard", element: <AdminDashBoard /> },
                ],
            }

        ]
    }
])