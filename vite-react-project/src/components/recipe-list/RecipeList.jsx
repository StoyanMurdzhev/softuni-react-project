import { useState, useEffect } from "react";
import { getWithPagination } from "../../services/recipeService";
import { useSearchParams } from "react-router-dom";

import RecipeCard from "../recipe-card/RecipeCard";
import MealTypeButtons from "../buttons/MealTypeButtons";
import LoadingSpinner from "../spinner/LoadingSpinner";

export default function RecipeList() {
    let [searchParams, setSearchParams] = useSearchParams();
    const mealType = searchParams.get("type");

    const [recipes, setRecipes] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [isLoadingInitial, setIsLoadingInitial] = useState(true);
    const [isLoadingNext, setIsLoadingNext] = useState(false);
    const [hasMoreRecipes, setHasMoreRecipes] = useState(true);
    const [mealTypeFilter, setMealTypeFilter] = useState("");
    const [error, setError] = useState(null);
    const pageSize = 6;

    async function getMore(mealTypeFilter) {
        setIsLoadingNext(true);
        setError(null);
        try {

            const { recipes, lastVisibleRecipe, isLastBatch } = await getWithPagination(lastVisible, pageSize, mealTypeFilter);
            const nextRecipes = recipes.map(recipe => (
                    {
                        ...recipe.data(),
                        id: recipe.id
                    }
                )
            );

            setRecipes(previousRecipes => [...previousRecipes, ...nextRecipes]);

            setLastVisible(lastVisibleRecipe);

            setHasMoreRecipes(!isLastBatch);



        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setIsLoadingNext(false);
        }

    }

    async function handleFilter(mealType) {
        if (mealType) {
            setSearchParams({ type: mealType });
        } else {
            setSearchParams({});
        }
        
            setMealTypeFilter(mealType);
            setRecipes([]);
            setLastVisible(null);
            setHasMoreRecipes(true);
        
    }

    useEffect(() => {
        (async () => {
            setIsLoadingInitial(true);
            setError(null);


            try {
                const { recipes, lastVisibleRecipe, isLastBatch } = await getWithPagination(null, pageSize, mealTypeFilter);
                const initialRecipes = recipes.map(recipe => (
                    {
                        ...recipe.data(),
                        id: recipe.id
                    }
                ));

                setRecipes(initialRecipes);
                setLastVisible(lastVisibleRecipe);
                setHasMoreRecipes(!isLastBatch);

            } catch (err) {
                setError(err);
            } finally {
                setIsLoadingInitial(false);
            }

        })();
    }, [mealTypeFilter]);

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

                <div className="flex justify-center mt-8">
                    <MealTypeButtons handleFilter={handleFilter} />
                </div>

                {error ?
                    (
                        <p className="max-w-lg mx-auto mt-14 text-gray-500 text-center text-2xl">
                            {error.message}
                        </p>)
                    : isLoadingInitial ?
                        <LoadingSpinner />
                        : (
                            <>
                                <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
                                    {recipes.map(recipe => (
                                        <RecipeCard key={recipe.id} recipe={recipe} />
                                    ))}
                                </div>
                                <div className="flex justify-center mt-8">
                                    {isLoadingNext
                                        ?
                                        (<LoadingSpinner />)
                                        :
                                        (hasMoreRecipes && <button onClick={() => getMore(mealTypeFilter)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Load more recipes</button>)
                                    }
                                </div>
                            </>
                        )}

            </div>
        </section>

    )
}