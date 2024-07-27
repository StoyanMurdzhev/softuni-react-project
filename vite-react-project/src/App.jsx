import Navbar from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import GuestRoutes from "./utils/GuestRoutes";
import Footer from "./components/footer/Footer";
import RecipeDetails from "./components/recipe-details/RecipeDetails";
import RecipeCreate from "./components/recipe-create/RecipeCreate";
import RecipeList from "./components/recipe-list/RecipeList";

function App() {

    return (
        <>
            <Navbar />
            
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/recipes" element={<RecipeList />}/>
                <Route path="/recipes/:id/details" element={<RecipeDetails />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path="/create" element={<RecipeCreate />}/>
                </Route>

                <Route element={<GuestRoutes />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

            </Routes>

            <Footer />
        </>
    )
}

export default App
