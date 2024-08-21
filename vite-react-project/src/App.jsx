import { Route, Routes } from "react-router-dom";

import ProtectedRoutes from "./utils/ProtectedRoutes";
import GuestRoutes from "./utils/GuestRoutes";

import Navbar from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Footer from "./components/footer/Footer";
import RecipeDetails from "./components/recipe-details/RecipeDetails";
import RecipeCreate from "./components/recipe-create/RecipeCreate";
import RecipeList from "./components/recipe-list/RecipeList";
import RecipeEdit from "./components/recipe-edit/RecipeEdit";
import MyRecipes from "./components/my-recipes/MyRecipes";
import NotFound from "./components/not-found/NotFound";

function App() {

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<Home />} />
                <Route path="/recipes" element={<RecipeList />}/>
                <Route path="/recipes/:id/details" element={<RecipeDetails />} />
                
                <Route element={<ProtectedRoutes />}>
                    <Route path="/create" element={<RecipeCreate />}/>
                    <Route path="/my-recipes" element={<MyRecipes />}/>
                    <Route path="/recipes/:id/edit" element={<RecipeEdit />}/>
                </Route>

                <Route element={<GuestRoutes />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

            </Routes>

            <Footer />
        </div>
    )
}

export default App
