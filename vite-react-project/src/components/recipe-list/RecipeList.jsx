import { useState, useEffect } from "react";
import { getAllWithPagination } from "../../services/recipeService";

import RecipeCard from "../recipe-card/RecipeCard";

export default function RecipeList() {

    const [recipes, setRecipes] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function getMore() {
        setIsLoading(true);
        const { recipes: nextRecipes, lastVisibleRecipe } = await getAllWithPagination(lastVisible);
        setRecipes(previousRecipes => [...previousRecipes, ...nextRecipes]);
        setLastVisible(lastVisibleRecipe);
        setIsLoading(false);
    }

    useEffect(() => {
        getMore();
    }, [])

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                        All Recipes
                    </h1>
                    <p className="max-w-lg mx-auto mt-4 text-gray-500">
                        Here you can browse all the recipies shared by our users!
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
                    {recipes.map(recipe => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                    {isLoading 
                    ? <p>Loading...</p> 
                    : <button onClick={getMore}>Load more recipes</button>}
                </div>
            </div>
        </section>

    )
}