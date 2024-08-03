import { useState, useEffect } from "react";
import { getWithPagination } from "../../services/recipeService";

import RecipeCard from "../recipe-card/RecipeCard";
import MealTypeButtons from "../buttons/MealTypeButtons";

export default function RecipeList() {

    const [recipes, setRecipes] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMoreRecipes, setHasMoreRecipes] = useState(true);
    const [mealTypeFilter, setMealTypeFilter] = useState("");
    const [error, setError] = useState(null);

    async function getMore(mealTypeFilter) {
        const pageSize = 6;
        setIsLoading(true);
        setError(null);
        try {

            const { recipes, lastVisibleRecipe, isLastBatch } = await getWithPagination(lastVisible, pageSize, mealTypeFilter);
            const nextRecipes = recipes.map(recipe => (
                {
                    ...recipe.data(),
                    id: recipe.id
                }
            )
            )
            setRecipes(previousRecipes => [...previousRecipes, ...nextRecipes]);

            setLastVisible(lastVisibleRecipe);

            if (isLastBatch) {
                setHasMoreRecipes(false);
            }

            

        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }

    }

    async function handleFilter(type) {
        setError(null);
        setIsLoading(true);
        try {
            setMealTypeFilter(type);
            const { recipes, lastVisibleRecipe, isLastBatch } = await getWithPagination(null, 6, type);
            const filteredRecipes = recipes.map(recipe => (
                {
                    ...recipe.data(),
                    id: recipe.id
                }
            )
            )

            setRecipes(filteredRecipes);
            console.log(isLastBatch);
            
            if (isLastBatch) {
                setHasMoreRecipes(false);
            } else {
                setLastVisible(lastVisibleRecipe);
                setHasMoreRecipes(true);
            }

        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        (async () => {

            try {
                const pageSize = 7;
                const { recipes } = await getWithPagination(null, pageSize, null);
                const initialRecipes = recipes.map(recipe => (
                    {
                        ...recipe.data(),
                        id: recipe.id
                    }
                ));
                setRecipes(initialRecipes.slice(0, 6));
                setLastVisible(recipes[5]);

                if (initialRecipes.length < pageSize) {
                    setHasMoreRecipes(false);
                }

            } catch (err) {
                console.error(err);
            }

        })();
    }, []);

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                        All Recipes
                    </h1>
                    <p className="max-w-lg mx-auto mt-4 text-gray-500">
                        Here you can browse all the recipes shared by our users!
                    </p>
                </div>
                <MealTypeButtons handleFilter={handleFilter} />

                {error ?
                    (
                        <p className="max-w-lg mx-auto mt-4 text-gray-500">
                            {error.message}
                        </p>)
                    : (
                        <>
                            <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
                                {recipes.map(recipe => (
                                    <RecipeCard key={recipe.id} recipe={recipe} />
                                ))}
                            </div>
                            <div className="flex justify-center mt-8">
                                {isLoading
                                    ? <p>Loading...</p>
                                    : hasMoreRecipes && <button onClick={() => getMore(mealTypeFilter)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Load more recipes</button>}
                            </div>
                        </>
                    )}

            </div>
        </section>

    )
}