import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export default function GuestRoutes() {
    const { user } = useAuth();

    return (
        !user ? <Outlet /> : <Navigate to="/" />
    )

}