import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getRecipesByUser } from "../../services/recipeService";

import RecipeCard from "../recipe-card/RecipeCard";
import { Link } from "react-router-dom";

export default function MyRecipes() {
    const { user } = useAuth();

    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {

            try {
                const recipes = await getRecipesByUser(user.uid);
                setRecipes(recipes);
                setIsLoading(false);

            } catch (err) {
                setError(err.message);
            }
        })();
    }, []);

    let additionalClassNames = "justify-items-center";

    if (recipes.length === 2) {
        additionalClassNames += " grid-cols-2";
        console.log(additionalClassNames);
        
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                        Your recipes
                    </h1>
                    <p className="max-w-lg mx-auto mt-4 text-gray-500">
                        {error ?
                            (
                                <>
                                    {error}

                                    {<Link to="/create"
                                        className="block px-3 py-2 text-gray-600 rounded-lg dark:text-gray-200 hover:bg-gray-100 lg:mx-2"
                                    >
                                        Try creating a recipe!
                                    </Link>}
                                </>
                            )
                            : "See the recipes you've posted so far"}
                    </p>
                </div>
                <div className={`grid grid-cols-1 gap-8 mt-8 md:mt-16 ${recipes.length < 3 ? additionalClassNames : 'md:grid-cols-2 xl:grid-cols-3'}`}>
                    {recipes.map(recipe => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </div>
        </section>
    )
}