import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoutes() {
    const { user } = useAuth();

    return (
        user ? <Outlet /> : <Navigate to="/login" />
    )

}