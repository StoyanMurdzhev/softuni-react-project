import Navbar from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import GuestRoutes from "./utils/GuestRoutes";

function App() {

    return (
        <>
            <Navbar />

            <Routes>

                <Route element={<ProtectedRoutes />}>
                    <Route path="/" element={<Home />} />
                </Route>

                <Route element={<GuestRoutes />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

            </Routes>
        </>
    )
}

export default App
