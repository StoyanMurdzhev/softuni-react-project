import { useState, useEffect } from "react";
import { getLastThree } from "../../services/recipeService";

import RecipeCard from "../recipe-card/RecipeCard";

export default function RecentRecipes() {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        (async() => {
            const fetchedRecipes = await getLastThree();
            setRecipes(fetchedRecipes); 
        }
        )();
    }, []);
    
    return (
        <section className="bg-white dark:bg-gray-900 mx-20 mt-14 mb-10">
            <div className="container px-6 py-10 mx-auto">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white"> Recent Recipes </h1>
                </div>
                <hr className="my-4 border-gray-200 dark:border-gray-700" />
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {recipes.map(recipe => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </div>
        </section>

    );
}